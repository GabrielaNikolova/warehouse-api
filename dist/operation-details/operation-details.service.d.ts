import { UpdateOperationDetailDto } from './dto/update-operation-detail.dto';
import { OperationDetail } from './entities/operation-detail.entity';
import { Repository } from 'typeorm';
import { OperationDetailDto } from './dto/operation-detail.dto';
import { CreateOperationDto } from 'src/operation/dto/create-operation.dto';
import { WarehouseService } from 'src/warehouse/warehouse.service';
export declare class OperationDetailsService {
    private repo;
    private warehouseService;
    constructor(repo: Repository<OperationDetail>, warehouseService: WarehouseService);
    findAll(): Promise<OperationDetail[]>;
    findOne(id: string): Promise<OperationDetail>;
    create(operationDetailDtos: OperationDetailDto[]): Promise<string[]>;
    update(id: string, updateOperationDetailDto: UpdateOperationDetailDto): Promise<OperationDetail>;
    delete(id: string): Promise<string>;
    permDelete(id: string): Promise<string>;
    checkDetailsForProductId(id: string): Promise<boolean>;
    checkAvailableQuantity(createOperatioDto: CreateOperationDto, existingData: OperationDetailDto[]): Promise<void>;
    findDetailsByOperationId(opId: string): Promise<OperationDetail[]>;
    findBestsellingProducts(): Promise<any[]>;
    getProductsWithHighestAvailability(): Promise<any[]>;
}
