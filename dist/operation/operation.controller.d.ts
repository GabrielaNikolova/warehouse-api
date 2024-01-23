import { OperationService } from './operation.service';
import { CreateOperationDto } from './dto/create-operation.dto';
import { UpdateOperationDto } from './dto/update-operation.dto';
export declare class OperationController {
    private readonly operationService;
    constructor(operationService: OperationService);
    findAll(): Promise<import("./entities/operation.entity").Operation[]>;
    findOne(id: string): Promise<import("./entities/operation.entity").Operation>;
    create(createOperationDto: CreateOperationDto): Promise<import("./dto/report-operation.dto").OperationReportDto | import("./dto/report-operation.dto").OperationReportDto[]>;
    update(id: string, updateOperationDto: UpdateOperationDto): Promise<import("./entities/operation.entity").Operation>;
    delete(id: string): Promise<string>;
    permDelete(id: string): Promise<string>;
}
