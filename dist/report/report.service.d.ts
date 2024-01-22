import { OperationDetailsService } from 'src/operation-details/operation-details.service';
import { OperationService } from 'src/operation/operation.service';
export declare class ReportService {
    private operationDetailsService;
    private operationService;
    constructor(operationDetailsService: OperationDetailsService, operationService: OperationService);
    findBestsellingProducts(): Promise<any[]>;
    findBestClient(): Promise<any[]>;
    findHighestAvailability(): Promise<any[]>;
}
