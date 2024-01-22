"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OperationDetailsModule = void 0;
const common_1 = require("@nestjs/common");
const operation_details_service_1 = require("./operation-details.service");
const operation_details_controller_1 = require("./operation-details.controller");
const typeorm_1 = require("@nestjs/typeorm");
const operation_detail_entity_1 = require("./entities/operation-detail.entity");
const warehouse_module_1 = require("../warehouse/warehouse.module");
let OperationDetailsModule = class OperationDetailsModule {
};
exports.OperationDetailsModule = OperationDetailsModule;
exports.OperationDetailsModule = OperationDetailsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([operation_detail_entity_1.OperationDetail]), warehouse_module_1.WarehouseModule],
        controllers: [operation_details_controller_1.OperationDetailsController],
        providers: [operation_details_service_1.OperationDetailsService],
        exports: [operation_details_service_1.OperationDetailsService],
    })
], OperationDetailsModule);
//# sourceMappingURL=operation-details.module.js.map