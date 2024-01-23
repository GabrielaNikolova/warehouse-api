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
exports.Operation = void 0;
const operation_type_enum_1 = require("../../enum/operation-type.enum");
const typeorm_1 = require("typeorm");
let Operation = class Operation {
    constructor() { }
};
exports.Operation = Operation;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Operation.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('enum', { enum: operation_type_enum_1.OperationType }),
    __metadata("design:type", String)
], Operation.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)('boolean', { name: 'is_transfer', default: false }),
    __metadata("design:type", Boolean)
], Operation.prototype, "isTransfer", void 0);
__decorate([
    (0, typeorm_1.Column)('timestamp'),
    __metadata("design:type", Date)
], Operation.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'client_id', nullable: false }),
    __metadata("design:type", String)
], Operation.prototype, "client", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'warehouse_id', nullable: false }),
    __metadata("design:type", String)
], Operation.prototype, "warehouse", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp', name: 'created_at' }),
    __metadata("design:type", Date)
], Operation.prototype, "created", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamp', name: 'updated_at' }),
    __metadata("design:type", Date)
], Operation.prototype, "updated", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ type: 'timestamp', name: 'deleted_at' }),
    __metadata("design:type", Date)
], Operation.prototype, "deleted", void 0);
exports.Operation = Operation = __decorate([
    (0, typeorm_1.Entity)('operation'),
    __metadata("design:paramtypes", [])
], Operation);
//# sourceMappingURL=operation.entity.js.map