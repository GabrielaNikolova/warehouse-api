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
exports.ReportController = void 0;
const common_1 = require("@nestjs/common");
const operation_details_service_1 = require("../operation-details/operation-details.service");
const operation_service_1 = require("../operation/operation.service");
let ReportController = class ReportController {
    constructor(operationDetailsService, operationService) {
        this.operationDetailsService = operationDetailsService;
        this.operationService = operationService;
    }
    async getBestsellingProducts() {
        const bestsellingProducts = await this.operationDetailsService.findBestsellingProducts();
        return bestsellingProducts;
    }
    async getClientsWithMostOrders() {
        const bestClient = await this.operationService.getClientWithMostOrders();
        return bestClient;
    }
    async getHighestAvailability() {
        const products = await this.operationDetailsService.getProductsWithHighestAvailability();
        return products;
    }
};
exports.ReportController = ReportController;
__decorate([
    (0, common_1.Get)('/bestselling'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ReportController.prototype, "getBestsellingProducts", null);
__decorate([
    (0, common_1.Get)('/best-client'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ReportController.prototype, "getClientsWithMostOrders", null);
__decorate([
    (0, common_1.Get)('/product-per-warehouse'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ReportController.prototype, "getHighestAvailability", null);
exports.ReportController = ReportController = __decorate([
    (0, common_1.Controller)('report'),
    __metadata("design:paramtypes", [operation_details_service_1.OperationDetailsService,
        operation_service_1.OperationService])
], ReportController);
//# sourceMappingURL=report.controller.js.map