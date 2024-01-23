import { OperationDetailsService } from 'src/operation-details/operation-details.service';
import { OperationService } from 'src/operation/operation.service';
export declare class ReportController {
    private readonly operationDetailsService;
    private readonly operationService;
    constructor(operationDetailsService: OperationDetailsService, operationService: OperationService);
    getBestsellingProducts(): Promise<any[]>;
    getClientsWithMostOrders(): Promise<any[]>;
    getHighestAvailability(): Promise<any[]>;
}
