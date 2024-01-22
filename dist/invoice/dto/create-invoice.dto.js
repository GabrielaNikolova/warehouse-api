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
exports.CreateInvoiceDto = void 0;
const class_validator_1 = require("class-validator");
const is_unique_decorator_1 = require("../../util/decorator/is-unique.decorator");
class CreateInvoiceDto {
}
exports.CreateInvoiceDto = CreateInvoiceDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, is_unique_decorator_1.isUnique)({ tableName: 'invoice', column: 'number' }),
    (0, class_validator_1.IsString)({ message: 'Invoice number must be in string format' }),
    (0, class_validator_1.MinLength)(5, {
        message: 'Invoice number is too short',
    }),
    (0, class_validator_1.MaxLength)(10, {
        message: 'Invoice number is too long',
    }),
    __metadata("design:type", String)
], CreateInvoiceDto.prototype, "number", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], CreateInvoiceDto.prototype, "date", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateInvoiceDto.prototype, "operation", void 0);
//# sourceMappingURL=create-invoice.dto.js.map