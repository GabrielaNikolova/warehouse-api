import { Injectable } from '@nestjs/common';
import { OperationDetailsService } from 'src/operation-details/operation-details.service';
import { OperationService } from 'src/operation/operation.service';

@Injectable()
export class ReportService {
    constructor(
        private operationDetailsService: OperationDetailsService,
        private operationService: OperationService,
    ) {}

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
}
