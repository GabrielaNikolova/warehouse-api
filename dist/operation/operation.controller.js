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
exports.OperationController = void 0;
const common_1 = require("@nestjs/common");
const operation_service_1 = require("./operation.service");
const create_operation_dto_1 = require("./dto/create-operation.dto");
const update_operation_dto_1 = require("./dto/update-operation.dto");
const user_role_enum_1 = require("../enum/user-role.enum");
const has_roles_decorator_1 = require("../util/decorator/has-roles.decorator");
const role_guard_1 = require("../util/guard/role.guard");
let OperationController = class OperationController {
    constructor(operationService) {
        this.operationService = operationService;
    }
    async findAll() {
        return await this.operationService.findAll();
    }
    async findOne(id) {
        return await this.operationService.findOne(id);
    }
    async create(createOperationDto) {
        return await this.operationService.create(createOperationDto);
    }
    async update(id, updateOperationDto) {
        return await this.operationService.update(id, updateOperationDto);
    }
    async delete(id) {
        return await this.operationService.delete(id);
    }
    async permDelete(id) {
        return await this.operationService.permDelete(id);
    }
};
exports.OperationController = OperationController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OperationController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OperationController.prototype, "findOne", null);
__decorate([
    (0, has_roles_decorator_1.HasRoles)(user_role_enum_1.UserRole.OWNER, user_role_enum_1.UserRole.OPERATOR),
    (0, common_1.Post)('/create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_operation_dto_1.CreateOperationDto]),
    __metadata("design:returntype", Promise)
], OperationController.prototype, "create", null);
__decorate([
    (0, has_roles_decorator_1.HasRoles)(user_role_enum_1.UserRole.OWNER, user_role_enum_1.UserRole.OPERATOR),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_operation_dto_1.UpdateOperationDto]),
    __metadata("design:returntype", Promise)
], OperationController.prototype, "update", null);
__decorate([
    (0, has_roles_decorator_1.HasRoles)(user_role_enum_1.UserRole.OWNER, user_role_enum_1.UserRole.OPERATOR),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OperationController.prototype, "delete", null);
__decorate([
    (0, has_roles_decorator_1.HasRoles)(user_role_enum_1.UserRole.OWNER),
    (0, common_1.Delete)('/del/:id'),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OperationController.prototype, "permDelete", null);
exports.OperationController = OperationController = __decorate([
    (0, common_1.UseGuards)(role_guard_1.RolesGuard),
    (0, common_1.Controller)('operation'),
    __metadata("design:paramtypes", [operation_service_1.OperationService])
], OperationController);
//# sourceMappingURL=operation.controller.js.map