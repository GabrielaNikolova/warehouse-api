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
exports.OperationService = void 0;
const common_1 = require("@nestjs/common");
const operation_entity_1 = require("./entities/operation.entity");
const report_operation_dto_1 = require("./dto/report-operation.dto");
const class_transformer_1 = require("class-transformer");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const client_service_1 = require("../client/client.service");
const warehouse_service_1 = require("../warehouse/warehouse.service");
const product_service_1 = require("../product/product.service");
const operation_details_service_1 = require("../operation-details/operation-details.service");
const operation_dto_1 = require("./dto/operation.dto");
const operation_type_enum_1 = require("../enum/operation-type.enum");
const invoice_service_1 = require("../invoice/invoice.service");
const client_entity_1 = require("../client/entities/client.entity");
let OperationService = class OperationService {
    constructor(repo, clientService, warehouseService, productService, operationDetailService, invoiceService) {
        this.repo = repo;
        this.clientService = clientService;
        this.warehouseService = warehouseService;
        this.productService = productService;
        this.operationDetailService = operationDetailService;
        this.invoiceService = invoiceService;
    }
    async findAll() {
        const operations = await this.repo.find();
        if (!operations) {
            throw new common_1.NotFoundException(`There are no operation records in the database`);
        }
        return operations;
    }
    async findOne(id) {
        const operation = await this.repo.findOneBy({ id });
        if (!operation) {
            throw new common_1.NotFoundException(`Operation with id: ${id} was not found`);
        }
        return operation;
    }
    async create(createOperationDto) {
        const existingData = await this.getRequestedData(createOperationDto);
        if (createOperationDto.type === 'delivery') {
            return await this.createOperationWithDetails(createOperationDto, existingData);
        }
        else if (createOperationDto.type === 'stock picking') {
            await this.operationDetailService.checkAvailableQuantity(createOperationDto, existingData);
            return await this.createOperationWithDetails(createOperationDto, existingData);
        }
        else if (createOperationDto.type === 'transfer') {
            let output = [];
            createOperationDto.isTransfer = true;
            createOperationDto.type = operation_type_enum_1.OperationType.STOCK_PICKING;
            await this.operationDetailService.checkAvailableQuantity(createOperationDto, existingData);
            const firstOperation = await this.createOperationWithDetails(createOperationDto, existingData);
            createOperationDto.type = operation_type_enum_1.OperationType.DELIVERY;
            const secondOperation = await this.createOperationWithDetails(createOperationDto, existingData);
            output = [firstOperation, secondOperation];
            return output;
        }
    }
    async createOperation(createOperationDto) {
        const client = await this.clientService.findOne(createOperationDto.client);
        const warehouse = await this.warehouseService.findOne(createOperationDto.warehouse);
        const operationDto = new operation_dto_1.OperationDto();
        if (createOperationDto.isTransfer) {
            operationDto.isTransfer = true;
        }
        if (createOperationDto.warehouseIn && createOperationDto.type === 'delivery') {
            const warehouseIn = await this.warehouseService.findOne(createOperationDto.warehouseIn);
            operationDto.warehouse = warehouseIn.id;
        }
        else {
            operationDto.warehouse = warehouse.id;
        }
        operationDto.type = createOperationDto.type;
        operationDto.date = createOperationDto.date;
        operationDto.client = client.id;
        this.repo.create(operationDto);
        const operation = await this.repo.save(operationDto);
        return operation;
    }
    async createOperationWithDetails(createOperationDto, existingData) {
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
        const output = (0, class_transformer_1.plainToInstance)(report_operation_dto_1.OperationReportDto, operation, {
            excludeExtraneousValues: true,
        });
        output.products = details;
        return output;
    }
    async update(id, updateOperationDto) {
        const operation = await this.findOne(id);
        await this.clientService.findOne(updateOperationDto.client);
        Object.assign(operation, updateOperationDto);
        return await this.repo.save(operation);
    }
    async delete(id) {
        const operation = await this.findOne(id);
        const details = await this.operationDetailService.findDetailsByOperationId(id);
        for (const detail of details) {
            await this.operationDetailService.delete(detail.id);
        }
        await this.repo.softRemove(operation);
        return operation.id;
    }
    async permDelete(id) {
        const operation = await this.findOne(id);
        const details = await this.operationDetailService.findDetailsByOperationId(id);
        for (const detail of details) {
            await this.operationDetailService.permDelete(detail.id);
        }
        await this.repo.remove(operation);
        return operation.id;
    }
    async getRequestedData(createOperationDto) {
        const client = await this.clientService.findOne(createOperationDto.client);
        if (createOperationDto.type === 'transfer' && createOperationDto.warehouseIn) {
            const warehouseIn = await this.warehouseService.findOne(createOperationDto.warehouseIn);
            if (!warehouseIn) {
                throw new common_1.NotFoundException(`Delivery warehouse with id: ${createOperationDto.warehouseIn} was not found.`);
            }
        }
        else if (createOperationDto.type === 'transfer' && !createOperationDto.warehouseIn) {
            throw new common_1.BadRequestException('Please provide information about the delivery warehouse');
        }
        const warehouse = await this.warehouseService.findOne(createOperationDto.warehouse);
        const existingProducts = await this.productService.findProductsByIds(createOperationDto.products, warehouse.type);
        if (!existingProducts || undefined || existingProducts.length === 0) {
            throw new common_1.NotFoundException('Requested products are not available for this operation');
        }
        return existingProducts;
    }
    async getClientWithMostOrders() {
        const productOrders = await this.repo
            .createQueryBuilder('report')
            .leftJoinAndSelect(client_entity_1.Client, 'client', 'report.client = client.id')
            .select('client.id', 'id')
            .addSelect('CAST(COUNT(report.id)as INTEGER)', 'orders')
            .where('report.type = :operationType', { operationType: operation_type_enum_1.OperationType.STOCK_PICKING })
            .groupBy('client.id')
            .orderBy('orders', 'DESC')
            .limit(5)
            .getRawMany();
        if (!productOrders) {
            throw new common_1.NotFoundException(`Don't have clients with orders in the database.`);
        }
        return productOrders;
    }
};
exports.OperationService = OperationService;
exports.OperationService = OperationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(operation_entity_1.Operation)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        client_service_1.ClientService,
        warehouse_service_1.WarehouseService,
        product_service_1.ProductService,
        operation_details_service_1.OperationDetailsService,
        invoice_service_1.InvoiceService])
], OperationService);
//# sourceMappingURL=operation.service.js.map