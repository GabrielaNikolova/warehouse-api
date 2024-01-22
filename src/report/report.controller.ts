import { Controller, Get } from '@nestjs/common';
import { ReportService } from './report.service';

@Controller('report')
export class ReportController {
    constructor(private readonly reportService: ReportService) {}

    @Get('/bestselling')
    async getBestsellingProducts() {
        const report = await this.reportService.findBestsellingProducts();
        return { report };
    }

    @Get('/best-client')
    async getClientsWithMostOrders() {
        const report = await this.reportService.findBestClient();
        return { report };
    }

    @Get('/product-per-warehouse')
    async getHighestAvailability() {
        const report = await this.reportService.findHighestAvailability();
        return { report };
    }
}
