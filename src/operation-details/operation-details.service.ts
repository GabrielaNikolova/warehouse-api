import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateOperationDetailDto } from './dto/update-operation-detail.dto';
import { OperationDetail } from './entities/operation-detail.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OperationDetailReportDto } from './dto/report-operation-detail.dto';
import { plainToInstance } from 'class-transformer';
import { OperationDetailDto } from './dto/operation-detail.dto';
import { CreateOperationDto } from 'src/operation/dto/create-operation.dto';
import { OperationType } from 'src/enum/operation-type.enum';
import { WarehouseService } from 'src/warehouse/warehouse.service';

@Injectable()
export class OperationDetailsService {
    constructor(
        @InjectRepository(OperationDetail) private repo: Repository<OperationDetail>,
        private warehouseService: WarehouseService,
    ) {}

    async findAll() {
        const operationDetail = await this.repo.find();
        if (!operationDetail) {
            throw new NotFoundException(`There are no operation details records in the database`);
        }

        const output = operationDetail.map((od) => {
            return plainToInstance(OperationDetailReportDto, od, {
                excludeExtraneousValues: true,
            });
        });

        return output;
    }

    async findOne(id: string) {
        const operationDetail = await this.repo.findOneBy({ id });
        if (!operationDetail) {
            throw new NotFoundException(`Operation Detail with id: ${id} not found`);
        }
        return operationDetail;
    }

    async create(operationDetailDtos: OperationDetailDto[]) {
        const detailsCreated: string[] = [];
        for (const dto of operationDetailDtos) {
            this.repo.create(dto);
            const detail: OperationDetail = await this.repo.save(dto);
            detailsCreated.push(detail.id);
        }

        return detailsCreated;
    }

    async update(id: string, updateOperationDetailDto: UpdateOperationDetailDto) {
        const operationDetail = await this.findOne(id);
        Object.assign(operationDetail, updateOperationDetailDto);
        return await this.repo.save(operationDetail);
    }

    async delete(id: string) {
        const operationDetail = await this.findOne(id);
        await this.repo.createQueryBuilder().softDelete().where({ id: operationDetail.id }).execute();

        return operationDetail.id;
    }

    async permDelete(id: string) {
        const operationDetail = await this.findOne(id);
        this.repo.remove(operationDetail);

        return operationDetail.id;
    }

    async checkAvailableQuantity(createOperatioDto: CreateOperationDto, existingData: OperationDetailDto[]) {
        const warehouse = await this.warehouseService.findOne(createOperatioDto.warehouse);
        // const availableProducts: OperationDetailDto[] = [];
        for (const opDetail of existingData) {
            const { sumIn } = await this.repo
                .createQueryBuilder('in')
                .leftJoinAndSelect('in.operation', 'operation')
                .select('SUM(in.productQuantity)', 'sumIn')
                .where('in.product = :productEntity', { productEntity: opDetail.product })
                .andWhere('operation.type = :type', { type: OperationType.DELIVERY })
                .andWhere('operation.warehouse.id = :warehouse', { warehouse: warehouse.id })
                .getRawOne();

            if (!sumIn) {
                throw new NotFoundException('Available product quantity is not enough!');
            }

            const { sumOut } = await this.repo
                .createQueryBuilder('out')
                .leftJoinAndSelect('out.operation', 'operation')
                .select('SUM(out.productQuantity)', 'sumOut')
                .where('out.product = :productEntity', { productEntity: opDetail.product })
                .andWhere('operation.type = :type', { type: OperationType.STOCK_PICKING })
                .andWhere('operation.warehouse.id = :warehouse', { warehouse: warehouse.id })
                .getRawOne();

            const availableQuantity = sumIn - sumOut;

            if (availableQuantity < opDetail.productQuantity) {
                throw new NotFoundException('Available product quantity is not enough!');
            }
        }
    }

    async findDetailsByOperationId(opId: string) {
        const opDetailIds = await this.repo
            .createQueryBuilder('details')
            .select('details.id')
            .where('details.operation = :operationEntity', { operationEntity: opId })
            .getMany();

        if (!opDetailIds) {
            throw new NotFoundException(`Details for operation: ${opId} are missing.`);
        }
        return opDetailIds;
    }

    async findBestsellingProducts() {
        const productOrders = await this.repo
            .createQueryBuilder('report')
            .leftJoinAndSelect('report.operation', 'operation')
            .leftJoinAndSelect('report.product', 'product')
            .select('product.id', 'id')
            .addSelect('product.name', 'product')
            .addSelect('SUM(report.productQuantity)', 'quantity')
            .where('operation.type = :operationType', { operationType: OperationType.STOCK_PICKING })
            .groupBy('product.id')
            .orderBy('quantity', 'DESC')
            .limit(5)
            .getRawMany();

        if (!productOrders) {
            throw new NotFoundException(`Don't have existing orders in the database.`);
        }
        return productOrders;
    }

    async getProductsWithHighestAvailability() {
        const products = this.repo
            .createQueryBuilder('operation_detail')
            .leftJoinAndSelect('operation_detail.operation', 'operation')
            .leftJoinAndSelect('operation_detail.product', 'product')
            .leftJoinAndSelect('operation.warehouse', 'warehouse')
            .distinctOn(['warehouse'])
            .select('product.id', 'id')
            .addSelect('product.name', 'product')
            .addSelect('warehouse.name', 'warehouse')
            .addSelect([
                'SUM(CASE WHEN operation.type = :deliveryType THEN operation_detail.product_quantity ELSE 0 END) - ' +
                    'SUM(CASE WHEN operation.type = :stockPickingType THEN operation_detail.product_quantity ELSE 0 END) as available_quantity',
            ])
            .setParameter('deliveryType', OperationType.DELIVERY)
            .setParameter('stockPickingType', OperationType.STOCK_PICKING)
            .groupBy('warehouse')
            .addGroupBy('product')
            .addGroupBy('product.id')
            .orderBy('warehouse', 'ASC')
            .getRawMany();

        if (!products) {
            throw new NotFoundException(`Don't have products that have been ordered.`);
        }
        return products;
    }
}
