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
exports.InvoiceService = void 0;
const common_1 = require("@nestjs/common");
const create_invoice_dto_1 = require("./dto/create-invoice.dto");
const invoice_entity_1 = require("./entities/invoice.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let InvoiceService = class InvoiceService {
    constructor(repo) {
        this.repo = repo;
    }
    async findAll() {
        const invoice = await this.repo.find();
        if (!invoice) {
            throw new common_1.NotFoundException(`There are no invoice records in the database`);
        }
        return invoice;
    }
    async findOne(id) {
        const invoice = await this.repo.findOneBy({ id });
        if (!invoice) {
            throw new common_1.NotFoundException(`Invoice with id: ${id} was not found`);
        }
        return invoice;
    }
    async create(createInvoiceDto) {
        const invoice = this.repo.create(createInvoiceDto);
        return await this.repo.save(invoice);
    }
    createDto() {
        const dto = new create_invoice_dto_1.CreateInvoiceDto();
        const number = generateID();
        dto.number = number;
        dto.date = new Date();
        return dto;
    }
    async update(id, updateInvoiceDto) {
        const invoice = await this.findOne(id);
        Object.assign(invoice, updateInvoiceDto);
        return await this.repo.save(invoice);
    }
    async delete(id) {
        const invoice = await this.findOne(id);
        return await this.repo.softRemove(invoice);
    }
    async permDelete(id) {
        const invoice = await this.findOne(id);
        return this.repo.remove(invoice);
    }
};
exports.InvoiceService = InvoiceService;
exports.InvoiceService = InvoiceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(invoice_entity_1.Invoice)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], InvoiceService);
function generateID() {
    const timestamp = new Date().getFullYear();
    const randomNum = Math.floor(Math.random() * 100);
    return `${timestamp}-${randomNum}`;
}
//# sourceMappingURL=invoice.service.js.map