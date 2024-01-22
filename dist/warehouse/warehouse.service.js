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
exports.WarehouseService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const warehouse_entity_1 = require("./entities/warehouse.entity");
const typeorm_2 = require("typeorm");
const report_warehouse_dto_1 = require("./dto/report-warehouse.dto");
const class_transformer_1 = require("class-transformer");
let WarehouseService = class WarehouseService {
    constructor(repo) {
        this.repo = repo;
    }
    async findAll() {
        const warehouses = await this.repo.find();
        const output = warehouses.map((w) => {
            return (0, class_transformer_1.plainToInstance)(report_warehouse_dto_1.WarehouseReportDto, w, {
                excludeExtraneousValues: true,
            });
        });
        return output;
    }
    async findOne(id) {
        const warehouse = await this.repo.findOneBy({ id });
        if (!warehouse) {
            throw new common_1.NotFoundException(`Warehouse with id: ${id} was not found`);
        }
        return warehouse;
    }
    async create(createWarehouseDto) {
        const warehouse = this.repo.create(createWarehouseDto);
        return await this.repo.save(warehouse);
    }
    async update(id, updateWarehouseDto) {
        const warehouse = await this.findOne(id);
        Object.assign(warehouse, updateWarehouseDto);
        return await this.repo.save(warehouse);
    }
    async delete(id) {
        const warehouse = await this.findOne(id);
        await this.repo.createQueryBuilder().softDelete().where({ id: warehouse.id }).execute();
        return warehouse.id;
    }
    async permDelete(id) {
        const warehouse = await this.findOne(id);
        this.repo.remove(warehouse);
        return warehouse.id;
    }
};
exports.WarehouseService = WarehouseService;
exports.WarehouseService = WarehouseService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(warehouse_entity_1.Warehouse)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], WarehouseService);
//# sourceMappingURL=warehouse.service.js.map