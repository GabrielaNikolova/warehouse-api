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
exports.ReportService = void 0;
const common_1 = require("@nestjs/common");
const operation_details_service_1 = require("../operation-details/operation-details.service");
const operation_service_1 = require("../operation/operation.service");
let ReportService = class ReportService {
    constructor(operationDetailsService, operationService) {
        this.operationDetailsService = operationDetailsService;
        this.operationService = operationService;
    }
    async findBestsellingProducts() {
        const bestsellingProducts = await this.operationDetailsService.findBestsellingProducts();
        return bestsellingProducts;
    }
    async findBestClient() {
        const bestClient = await this.operationService.getClientWithMostOrders();
        return bestClient;
    }
    async findHighestAvailability() {
        const products = await this.operationDetailsService.getProductsWithHighestAvailability();
        return products;
    }
};
exports.ReportService = ReportService;
exports.ReportService = ReportService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [operation_details_service_1.OperationDetailsService,
        operation_service_1.OperationService])
], ReportService);
//# sourceMappingURL=report.service.js.map