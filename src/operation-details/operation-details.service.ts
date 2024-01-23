import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateOperationDetailDto } from './dto/update-operation-detail.dto';
import { OperationDetail } from './entities/operation-detail.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OperationDetailDto } from './dto/operation-detail.dto';
import { CreateOperationDto } from 'src/operation/dto/create-operation.dto';
import { OperationType } from 'src/enum/operation-type.enum';
import { WarehouseService } from 'src/warehouse/warehouse.service';
import { Operation } from 'src/operation/entities/operation.entity';
import { Product } from 'src/product/entities/product.entity';
import { Warehouse } from 'src/warehouse/entities/warehouse.entity';

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

        return operationDetail;
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
                .leftJoinAndSelect(Operation, 'operation', 'in.operation = operation.id')
                .leftJoinAndSelect(Product, 'product', 'in.product = product.id')
                .leftJoinAndSelect(Warehouse, 'warehouse', 'operation.warehouse = warehouse.id')
                .select('SUM(in.productQuantity)', 'sumIn')
                .where('in.product = :productEntity', { productEntity: opDetail.product })
                .andWhere('operation.type = :type', { type: OperationType.DELIVERY })
                .andWhere('operation.warehouse = :warehouse', { warehouse: warehouse.id })
                .getRawOne();

            if (!sumIn) {
                throw new NotFoundException('Available product quantity is not enough!');
            }

            const { sumOut } = await this.repo
                .createQueryBuilder('out')
                .leftJoinAndSelect(Operation, 'operation', 'out.operation = operation.id')
                .leftJoinAndSelect(Product, 'product', 'out.product = product.id')
                .leftJoinAndSelect(Warehouse, 'warehouse', 'operation.warehouse = warehouse.id')
                .select('SUM(out.productQuantity)', 'sumOut')
                .where('out.product = :productEntity', { productEntity: opDetail.product })
                .andWhere('operation.type = :type', { type: OperationType.STOCK_PICKING })
                .andWhere('operation.warehouse = :warehouse', { warehouse: warehouse.id })
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
        const productOrders = this.repo
            .createQueryBuilder('report')
            .leftJoinAndSelect(Operation, 'operation', 'report.operation = operation.id')
            .leftJoinAndSelect(Product, 'product', 'report.product = product.id')
            .select('product.id', 'id')
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
        const products = await this.repo
            .createQueryBuilder('report')
            .leftJoinAndSelect(Operation, 'operation', 'report.operation = operation.id')
            .leftJoinAndSelect(Product, 'product', 'report.product = product.id')
            .leftJoinAndSelect(Warehouse, 'warehouse', 'operation.warehouse = warehouse.id')
            .distinctOn(['warehouse'])
            .select('product.id', 'product_id')
            .addSelect('warehouse.id', 'warehouse_id')
            .addSelect([
                'SUM(CASE WHEN operation.type = :deliveryType THEN report.product_quantity ELSE 0 END) - ' +
                    'SUM(CASE WHEN operation.type = :stockPickingType THEN report.product_quantity ELSE 0 END) as available_quantity',
            ])
            .setParameter('deliveryType', OperationType.DELIVERY)
            .setParameter('stockPickingType', OperationType.STOCK_PICKING)
            .groupBy('warehouse.id')
            .addGroupBy('product.id')
            .orderBy('warehouse', 'ASC')
            .getRawMany();

        if (!products) {
            throw new NotFoundException(`Don't have products that have been ordered.`);
        }
        return products;
    }
}
