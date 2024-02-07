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
exports.ProductController = void 0;
const common_1 = require("@nestjs/common");
const product_service_1 = require("./product.service");
const create_product_dto_1 = require("./dto/create-product.dto");
const update_product_dto_1 = require("./dto/update-product.dto");
const has_roles_decorator_1 = require("../util/decorator/has-roles.decorator");
const user_role_enum_1 = require("../enum/user-role.enum");
const role_guard_1 = require("../util/guard/role.guard");
const product_warehouse_category_enum_1 = require("../enum/product-warehouse-category.enum");
let ProductController = class ProductController {
    constructor(productService) {
        this.productService = productService;
    }
    async findAll() {
        return await this.productService.findAll();
    }
    async findByCategory(category) {
        console.log('CAT', category);
        return await this.productService.findAllByCategory(category);
    }
    async findOne(id) {
        return await this.productService.findOne(id);
    }
    async create(createProductDto) {
        return await this.productService.create(createProductDto);
    }
    async update(id, updateProductDto) {
        return await this.productService.update(id, updateProductDto);
    }
    async delete(id) {
        return await this.productService.delete(id);
    }
    async permDelete(id) {
        return await this.productService.permDelete(id);
    }
};
exports.ProductController = ProductController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "findAll", null);
__decorate([
    (0, has_roles_decorator_1.HasRoles)(user_role_enum_1.UserRole.OWNER, user_role_enum_1.UserRole.OPERATOR),
    (0, common_1.Get)('/search'),
    __param(0, (0, common_1.Query)('category')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "findByCategory", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "findOne", null);
__decorate([
    (0, has_roles_decorator_1.HasRoles)(user_role_enum_1.UserRole.OWNER, user_role_enum_1.UserRole.OPERATOR),
    (0, common_1.Post)('/create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_product_dto_1.CreateProductDto]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "create", null);
__decorate([
    (0, has_roles_decorator_1.HasRoles)(user_role_enum_1.UserRole.OWNER, user_role_enum_1.UserRole.OPERATOR),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_product_dto_1.UpdateProductDto]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "update", null);
__decorate([
    (0, has_roles_decorator_1.HasRoles)(user_role_enum_1.UserRole.OWNER, user_role_enum_1.UserRole.OPERATOR),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "delete", null);
__decorate([
    (0, has_roles_decorator_1.HasRoles)(user_role_enum_1.UserRole.OWNER),
    (0, common_1.Delete)('/del/:id'),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "permDelete", null);
exports.ProductController = ProductController = __decorate([
    (0, common_1.UseGuards)(role_guard_1.RolesGuard),
    (0, common_1.Controller)('product'),
    __metadata("design:paramtypes", [product_service_1.ProductService])
], ProductController);
//# sourceMappingURL=product.controller.js.map