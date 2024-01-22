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
exports.CreateClientDto = void 0;
const class_validator_1 = require("class-validator");
const is_unique_decorator_1 = require("../../util/decorator/is-unique.decorator");
class CreateClientDto {
}
exports.CreateClientDto = CreateClientDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)({ message: 'Name must be a string' }),
    (0, class_validator_1.MinLength)(5, {
        message: 'Name is too short',
    }),
    (0, class_validator_1.MaxLength)(100, {
        message: 'Name is too long',
    }),
    (0, is_unique_decorator_1.isUnique)({ tableName: 'client', column: 'name' }),
    __metadata("design:type", String)
], CreateClientDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Address must be a string' }),
    (0, class_validator_1.MaxLength)(350, {
        message: 'Address is too long',
    }),
    __metadata("design:type", String)
], CreateClientDto.prototype, "address", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)({ message: 'Accountable person name  must be a string' }),
    (0, class_validator_1.MinLength)(5, {
        message: 'Accountable person name  is too short',
    }),
    (0, class_validator_1.MaxLength)(100, {
        message: 'Accountable person name  is too long',
    }),
    __metadata("design:type", String)
], CreateClientDto.prototype, "accountablePerson", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)({ message: 'UIC must be a string' }),
    (0, class_validator_1.MinLength)(5, {
        message: 'UIC is too short',
    }),
    (0, class_validator_1.MaxLength)(20, {
        message: 'UIC is too long',
    }),
    (0, is_unique_decorator_1.isUnique)({ tableName: 'client', column: 'uic' }),
    __metadata("design:type", String)
], CreateClientDto.prototype, "uic", void 0);
//# sourceMappingURL=create-client.dto.js.map