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
exports.OperationDetail = void 0;
const typeorm_1 = require("typeorm");
let OperationDetail = class OperationDetail {
};
exports.OperationDetail = OperationDetail;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], OperationDetail.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('float', { name: 'product_quantity' }),
    __metadata("design:type", Number)
], OperationDetail.prototype, "productQuantity", void 0);
__decorate([
    (0, typeorm_1.Column)('float', { name: 'product_price' }),
    __metadata("design:type", Number)
], OperationDetail.prototype, "productPrice", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'operation_id', nullable: false }),
    __metadata("design:type", String)
], OperationDetail.prototype, "operation", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'product_id', nullable: false }),
    __metadata("design:type", String)
], OperationDetail.prototype, "product", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp', name: 'created_at' }),
    __metadata("design:type", Date)
], OperationDetail.prototype, "created", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamp', name: 'updated_at' }),
    __metadata("design:type", Date)
], OperationDetail.prototype, "updated", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ type: 'timestamp', name: 'deleted_at' }),
    __metadata("design:type", Date)
], OperationDetail.prototype, "deleted", void 0);
exports.OperationDetail = OperationDetail = __decorate([
    (0, typeorm_1.Entity)('operation_detail')
], OperationDetail);
//# sourceMappingURL=operation-detail.entity.js.map