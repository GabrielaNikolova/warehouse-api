import { OperationDetailsService } from './operation-details.service';
import { UpdateOperationDetailDto } from './dto/update-operation-detail.dto';
export declare class OperationDetailsController {
    private readonly operationDetailsService;
    constructor(operationDetailsService: OperationDetailsService);
    findAll(): Promise<import("./entities/operation-detail.entity").OperationDetail[]>;
    findOne(id: string): Promise<import("./entities/operation-detail.entity").OperationDetail>;
    update(id: string, updateOperationDetailDto: UpdateOperationDetailDto): Promise<import("./entities/operation-detail.entity").OperationDetail>;
}
