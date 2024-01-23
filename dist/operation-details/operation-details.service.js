"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OperationDetailsService = void 0;
const common_1 = require("@nestjs/common");
const operation_detail_entity_1 = require("./entities/operation-detail.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const operation_type_enum_1 = require("../enum/operation-type.enum");
const warehouse_service_1 = require("../warehouse/warehouse.service");
const operation_entity_1 = require("../operation/entities/operation.entity");
const product_entity_1 = require("../product/entities/product.entity");
const warehouse_entity_1 = require("../warehouse/entities/warehouse.entity");
let OperationDetailsService = class OperationDetailsService {
    constructor(repo, warehouseService) {
        this.repo = repo;
        this.warehouseService = warehouseService;
    }
    async findAll() {
        const operationDetail = await this.repo.find();
        if (!operationDetail) {
            throw new common_1.NotFoundException(`There are no operation details records in the database`);
        }
        return operationDetail;
    }
    async findOne(id) {
        const operationDetail = await this.repo.findOneBy({ id });
        if (!operationDetail) {
            throw new common_1.NotFoundException(`Operation Detail with id: ${id} not found`);
        }
        return operationDetail;
    }
    async create(operationDetailDtos) {
        const detailsCreated = [];
        for (const dto of operationDetailDtos) {
            this.repo.create(dto);
            const detail = await this.repo.save(dto);
            detailsCreated.push(detail.id);
        }
        return detailsCreated;
    }
    async update(id, updateOperationDetailDto) {
        const operationDetail = await this.findOne(id);
        Object.assign(operationDetail, updateOperationDetailDto);
        return await this.repo.save(operationDetail);
    }
    async delete(id) {
        const operationDetail = await this.findOne(id);
        await this.repo.createQueryBuilder().softDelete().where({ id: operationDetail.id }).execute();
        return operationDetail.id;
    }
    async permDelete(id) {
        const operationDetail = await this.findOne(id);
        this.repo.remove(operationDetail);
        return operationDetail.id;
    }
    async checkAvailableQuantity(createOperatioDto, existingData) {
        const warehouse = await this.warehouseService.findOne(createOperatioDto.warehouse);
        for (const opDetail of existingData) {
            const { sumIn } = await this.repo
                .createQueryBuilder('in')
                .leftJoinAndSelect(operation_entity_1.Operation, 'operation', 'in.operation = operation.id')
                .leftJoinAndSelect(product_entity_1.Product, 'product', 'in.product = product.id')
                .leftJoinAndSelect(warehouse_entity_1.Warehouse, 'warehouse', 'operation.warehouse = warehouse.id')
                .select('SUM(in.productQuantity)', 'sumIn')
                .where('in.product = :productEntity', { productEntity: opDetail.product })
                .andWhere('operation.type = :type', { type: operation_type_enum_1.OperationType.DELIVERY })
                .andWhere('operation.warehouse = :warehouse', { warehouse: warehouse.id })
                .getRawOne();
            if (!sumIn) {
                throw new common_1.NotFoundException('Available product quantity is not enough!');
            }
            const { sumOut } = await this.repo
                .createQueryBuilder('out')
                .leftJoinAndSelect(operation_entity_1.Operation, 'operation', 'out.operation = operation.id')
                .leftJoinAndSelect(product_entity_1.Product, 'product', 'out.product = product.id')
                .leftJoinAndSelect(warehouse_entity_1.Warehouse, 'warehouse', 'operation.warehouse = warehouse.id')
                .select('SUM(out.productQuantity)', 'sumOut')
                .where('out.product = :productEntity', { productEntity: opDetail.product })
                .andWhere('operation.type = :type', { type: operation_type_enum_1.OperationType.STOCK_PICKING })
                .andWhere('operation.warehouse = :warehouse', { warehouse: warehouse.id })
                .getRawOne();
            const availableQuantity = sumIn - sumOut;
            if (availableQuantity < opDetail.productQuantity) {
                throw new common_1.NotFoundException('Available product quantity is not enough!');
            }
        }
    }
    async findDetailsByOperationId(opId) {
        const opDetailIds = await this.repo
            .createQueryBuilder('details')
            .select('details.id')
            .where('details.operation = :operationEntity', { operationEntity: opId })
            .getMany();
        if (!opDetailIds) {
            throw new common_1.NotFoundException(`Details for operation: ${opId} are missing.`);
        }
        return opDetailIds;
    }
    async findBestsellingProducts() {
        const productOrders = this.repo
            .createQueryBuilder('report')
            .leftJoinAndSelect(operation_entity_1.Operation, 'operation', 'report.operation = operation.id')
            .leftJoinAndSelect(product_entity_1.Product, 'product', 'report.product = product.id')
            .select('product.id', 'id')
            .addSelect('SUM(report.productQuantity)', 'quantity')
            .where('operation.type = :operationType', { operationType: operation_type_enum_1.OperationType.STOCK_PICKING })
            .groupBy('product.id')
            .orderBy('quantity', 'DESC')
            .limit(5)
            .getRawMany();
        if (!productOrders) {
            throw new common_1.NotFoundException(`Don't have existing orders in the database.`);
        }
        return productOrders;
    }
    async getProductsWithHighestAvailability() {
        const products = await this.repo
            .createQueryBuilder('report')
            .leftJoinAndSelect(operation_entity_1.Operation, 'operation', 'report.operation = operation.id')
            .leftJoinAndSelect(product_entity_1.Product, 'product', 'report.product = product.id')
            .leftJoinAndSelect(warehouse_entity_1.Warehouse, 'warehouse', 'operation.warehouse = warehouse.id')
            .distinctOn(['warehouse'])
            .select('product.id', 'product_id')
            .addSelect('warehouse.id', 'warehouse_id')
            .addSelect([
            'SUM(CASE WHEN operation.type = :deliveryType THEN report.product_quantity ELSE 0 END) - ' +
                'SUM(CASE WHEN operation.type = :stockPickingType THEN report.product_quantity ELSE 0 END) as available_quantity',
        ])
            .setParameter('deliveryType', operation_type_enum_1.OperationType.DELIVERY)
            .setParameter('stockPickingType', operation_type_enum_1.OperationType.STOCK_PICKING)
            .groupBy('warehouse.id')
            .addGroupBy('product.id')
            .orderBy('warehouse', 'ASC')
            .getRawMany();
        if (!products) {
            throw new common_1.NotFoundException(`Don't have products that have been ordered.`);
        }
        return products;
    }
};
exports.OperationDetailsService = OperationDetailsService;
exports.OperationDetailsService = OperationDetailsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(operation_detail_entity_1.OperationDetail)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        warehouse_service_1.WarehouseService])
], OperationDetailsService);
//# sourceMappingURL=operation-details.service.js.map