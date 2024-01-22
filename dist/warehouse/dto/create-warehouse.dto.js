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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateWarehouseDto = void 0;
const class_validator_1 = require("class-validator");
const product_warehouse_category_enum_1 = require("../../enum/product-warehouse-category.enum");
const is_unique_decorator_1 = require("../../util/decorator/is-unique.decorator");
class CreateWarehouseDto {
}
exports.CreateWarehouseDto = CreateWarehouseDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, is_unique_decorator_1.isUnique)({ tableName: 'warehouse', column: 'name' }),
    (0, class_validator_1.IsString)({ message: 'Name must be a string' }),
    (0, class_validator_1.MinLength)(5, {
        message: 'Name is too short',
    }),
    (0, class_validator_1.MaxLength)(200, {
        message: 'Name is too long',
    }),
    __metadata("design:type", String)
], CreateWarehouseDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEnum)(product_warehouse_category_enum_1.ProductWarehouseCategory),
    __metadata("design:type", String)
], CreateWarehouseDto.prototype, "type", void 0);
//# sourceMappingURL=create-warehouse.dto.js.map