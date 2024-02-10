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
exports.InvoiceController = void 0;
const common_1 = require("@nestjs/common");
const invoice_service_1 = require("./invoice.service");
const update_invoice_dto_1 = require("./dto/update-invoice.dto");
const user_role_enum_1 = require("../enum/user-role.enum");
const has_roles_decorator_1 = require("../util/decorator/has-roles.decorator");
const role_guard_1 = require("../util/guard/role.guard");
let InvoiceController = class InvoiceController {
    constructor(invoiceService) {
        this.invoiceService = invoiceService;
    }
    async findAll() {
        return await this.invoiceService.findAll();
    }
    async findByOperation(opId) {
        console.log('opId', opId);
        return await this.invoiceService.findByOperationId(opId);
    }
    async findOne(id) {
        return await this.invoiceService.findOne(id);
    }
    async update(id, updateInvoiceDto) {
        return await this.invoiceService.update(id, updateInvoiceDto);
    }
    async delete(id) {
        return await this.invoiceService.delete(id);
    }
    async permDelete(id) {
        return await this.invoiceService.permDelete(id);
    }
};
exports.InvoiceController = InvoiceController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], InvoiceController.prototype, "findAll", null);
__decorate([
    (0, has_roles_decorator_1.HasRoles)(user_role_enum_1.UserRole.OWNER, user_role_enum_1.UserRole.OPERATOR),
    (0, common_1.Get)('/search'),
    __param(0, (0, common_1.Query)('opId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], InvoiceController.prototype, "findByOperation", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], InvoiceController.prototype, "findOne", null);
__decorate([
    (0, has_roles_decorator_1.HasRoles)(user_role_enum_1.UserRole.OWNER, user_role_enum_1.UserRole.OPERATOR),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_invoice_dto_1.UpdateInvoiceDto]),
    __metadata("design:returntype", Promise)
], InvoiceController.prototype, "update", null);
__decorate([
    (0, has_roles_decorator_1.HasRoles)(user_role_enum_1.UserRole.OWNER, user_role_enum_1.UserRole.OPERATOR),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], InvoiceController.prototype, "delete", null);
__decorate([
    (0, has_roles_decorator_1.HasRoles)(user_role_enum_1.UserRole.OWNER),
    (0, common_1.Delete)('/del/:id'),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], InvoiceController.prototype, "permDelete", null);
exports.InvoiceController = InvoiceController = __decorate([
    (0, common_1.UseGuards)(role_guard_1.RolesGuard),
    (0, common_1.Controller)('invoice'),
    __metadata("design:paramtypes", [invoice_service_1.InvoiceService])
], InvoiceController);
//# sourceMappingURL=invoice.controller.js.map