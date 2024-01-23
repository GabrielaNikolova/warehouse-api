import { Controller, Get } from '@nestjs/common';
import { OperationDetailsService } from 'src/operation-details/operation-details.service';
import { OperationService } from 'src/operation/operation.service';

@Controller('report')
export class ReportController {
    constructor(
        private readonly operationDetailsService: OperationDetailsService,
        private readonly operationService: OperationService,
    ) {}

    @Get('/bestselling')
    async getBestsellingProducts() {
        const bestsellingProducts = await this.operationDetailsService.findBestsellingProducts();

        return bestsellingProducts;
    }

    @Get('/best-client')
    async getClientsWithMostOrders() {
        const bestClient = await this.operationService.getClientWithMostOrders();

        return bestClient;
    }

    @Get('/product-per-warehouse')
    async getHighestAvailability() {
        const products = await this.operationDetailsService.getProductsWithHighestAvailability();

        return products;
    }
}
