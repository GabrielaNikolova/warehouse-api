import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateOperationDto } from './dto/create-operation.dto';
import { UpdateOperationDto } from './dto/update-operation.dto';
import { Operation } from './entities/operation.entity';
import { OperationReportDto } from './dto/report-operation.dto';
import { plainToInstance } from 'class-transformer';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientService } from 'src/client/client.service';
import { WarehouseService } from 'src/warehouse/warehouse.service';
import { ProductService } from 'src/product/product.service';
import { OperationDetailsService } from 'src/operation-details/operation-details.service';
import { OperationDto } from './dto/operation.dto';
import { OperationDetailDto } from 'src/operation-details/dto/operation-detail.dto';
import { OperationType } from 'src/enum/operation-type.enum';
import { InvoiceService } from 'src/invoice/invoice.service';
import { Client } from 'src/client/entities/client.entity';

@Injectable()
export class OperationService {
    constructor(
        @InjectRepository(Operation) private repo: Repository<Operation>,
        private clientService: ClientService,
        private warehouseService: WarehouseService,
        private productService: ProductService,
        private operationDetailService: OperationDetailsService,
        private invoiceService: InvoiceService,
    ) {}

    async findAll() {
        const operations = await this.repo.find();
        if (!operations) {
            throw new NotFoundException(`There are no operation records in the database`);
        }
        return operations;
    }

    async findOne(id: string) {
        const operation = await this.repo.findOneBy({ id });
        if (!operation) {
            throw new NotFoundException(`Operation with id: ${id} was not found`);
        }
        return operation;
    }

    async create(createOperationDto: CreateOperationDto) {
        const existingData = await this.getRequestedData(createOperationDto);

        if (createOperationDto.type === 'delivery') {
            return await this.createOperationWithDetails(createOperationDto, existingData);
        } else if (createOperationDto.type === 'stock picking') {
            await this.operationDetailService.checkAvailableQuantity(createOperationDto, existingData);

            return await this.createOperationWithDetails(createOperationDto, existingData);
        } else if (createOperationDto.type === 'transfer') {
            let output: OperationReportDto[] = [];

            createOperationDto.isTransfer = true;
            createOperationDto.type = OperationType.STOCK_PICKING;

            await this.operationDetailService.checkAvailableQuantity(createOperationDto, existingData);

            const firstOperation = await this.createOperationWithDetails(createOperationDto, existingData);

            createOperationDto.type = OperationType.DELIVERY;
            const secondOperation = await this.createOperationWithDetails(createOperationDto, existingData);

            output = [firstOperation, secondOperation];

            return output;
        }
    }

    async createOperation(createOperationDto: CreateOperationDto) {
        const client = await this.clientService.findOne(createOperationDto.client);
        const warehouse = await this.warehouseService.findOne(createOperationDto.warehouse);

        const operationDto = new OperationDto();

        if (createOperationDto.isTransfer) {
            operationDto.isTransfer = true;
        }

        if (createOperationDto.warehouseIn && createOperationDto.type === 'delivery') {
            const warehouseIn = await this.warehouseService.findOne(createOperationDto.warehouseIn);
            operationDto.warehouse = warehouseIn.id;
        } else {
            operationDto.warehouse = warehouse.id;
        }

        operationDto.type = createOperationDto.type;
        operationDto.date = createOperationDto.date;
        operationDto.client = client.id;

        this.repo.create(operationDto);
        const operation: Operation = await this.repo.save(operationDto);

        return operation;
    }

    async createOperationWithDetails(createOperationDto: CreateOperationDto, existingData: OperationDetailDto[]) {
        const operation = await this.createOperation(createOperationDto);

        if (operation.type === 'stock picking') {
            const invoiceDto = this.invoiceService.createDto();
            invoiceDto.operation = operation.id;
            await this.invoiceService.create(invoiceDto);
        }

        const operationDetails = existingData.map((operationDetail) => {
            operationDetail.operation = operation.id;
            return operationDetail;
        });

        const details = await this.operationDetailService.create(operationDetails);

        const output = plainToInstance(OperationReportDto, operation, {
            excludeExtraneousValues: true,
        });
        output.products = details;

        return output;
    }

    async update(id: string, updateOperationDto: UpdateOperationDto) {
        const operation = await this.findOne(id);

        //const client = await this.clientService.findOne(updateOperationDto.client);

        Object.assign(operation, updateOperationDto);
        return await this.repo.save(operation);
    }

    async delete(id: string) {
        const operation = await this.findOne(id);
        const details = await this.operationDetailService.findDetailsByOperationId(id);

        for (const detail of details) {
            await this.operationDetailService.delete(detail.id);
        }

        await this.repo.softRemove(operation);

        return operation.id;
    }

    async permDelete(id: string) {
        const operation = await this.findOne(id);

        const details = await this.operationDetailService.findDetailsByOperationId(id);
        for (const detail of details) {
            await this.operationDetailService.permDelete(detail.id);
        }

        await this.repo.remove(operation);

        return operation.id;
    }

    async getRequestedData(createOperationDto: CreateOperationDto) {
        const client = await this.clientService.findOne(createOperationDto.client);

        if (!client) {
            throw new NotFoundException(`Client with id: ${createOperationDto.client} was not found.`);
        }

        if (createOperationDto.type === 'transfer' && createOperationDto.warehouseIn) {
            const warehouseIn = await this.warehouseService.findOne(createOperationDto.warehouseIn);
            if (!warehouseIn) {
                throw new NotFoundException(
                    `Delivery warehouse with id: ${createOperationDto.warehouseIn} was not found.`,
                );
            }
        } else if (createOperationDto.type === 'transfer' && !createOperationDto.warehouseIn) {
            throw new BadRequestException('Please provide information about the delivery warehouse');
        }

        const warehouse = await this.warehouseService.findOne(createOperationDto.warehouse);

        if (!warehouse) {
            throw new NotFoundException(`Warehouse with id: ${createOperationDto.warehouse} was not found.`);
        }

        const existingProducts = await this.productService.findProductsByIds(
            createOperationDto.products,
            warehouse.type,
        );

        if (!existingProducts || undefined || existingProducts.length === 0) {
            throw new NotFoundException('Requested products are not available for this operation');
        }

        return existingProducts;
    }

    async getClientWithMostOrders() {
        const productOrders = await this.repo
            .createQueryBuilder('report')
            .leftJoinAndSelect(Client, 'client', 'report.client=client.id')
            .select('client.id', 'id')
            .addSelect('CAST(COUNT(report.id)as INTEGER)', 'orders')
            .where('report.type = :operationType', { operationType: OperationType.STOCK_PICKING })
            .groupBy('client.id')
            .orderBy('orders', 'DESC')
            .limit(5)
            .getRawMany();

        if (!productOrders) {
            throw new NotFoundException(`Don't have clients with orders in the database.`);
        }
        return productOrders;
    }
}
