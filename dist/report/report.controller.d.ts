import { ReportService } from './report.service';
export declare class ReportController {
    private readonly reportService;
    constructor(reportService: ReportService);
    getBestsellingProducts(): Promise<{
        report: any[];
    }>;
    getClientsWithMostOrders(): Promise<{
        report: any[];
    }>;
    getHighestAvailability(): Promise<{
        report: any[];
    }>;
}
