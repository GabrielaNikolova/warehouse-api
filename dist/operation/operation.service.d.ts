import { CreateOperationDto } from './dto/create-operation.dto';
import { UpdateOperationDto } from './dto/update-operation.dto';
import { Operation } from './entities/operation.entity';
import { Repository } from 'typeorm';
import { ClientService } from 'src/client/client.service';
import { WarehouseService } from 'src/warehouse/warehouse.service';
import { ProductService } from 'src/product/product.service';
import { OperationDetailsService } from 'src/operation-details/operation-details.service';
import { OperationDetailDto } from 'src/operation-details/dto/operation-detail.dto';
import { InvoiceService } from 'src/invoice/invoice.service';
export declare class OperationService {
    private repo;
    private clientService;
    private warehouseService;
    private productService;
    private operationDetailService;
    private invoiceService;
    constructor(repo: Repository<Operation>, clientService: ClientService, warehouseService: WarehouseService, productService: ProductService, operationDetailService: OperationDetailsService, invoiceService: InvoiceService);
    findAll(): Promise<Operation[]>;
    findOne(id: string): Promise<Operation>;
    create(createOperationDto: CreateOperationDto): Promise<unknown>;
    createOperation(createOperationDto: CreateOperationDto): Promise<Operation>;
    createOperationWithDetails(createOperationDto: CreateOperationDto, existingData: OperationDetailDto[]): Promise<unknown>;
    update(id: string, updateOperationDto: UpdateOperationDto): Promise<Operation>;
    delete(id: string): Promise<string>;
    permDelete(id: string): Promise<string>;
    getRequestedData(createOperationDto: CreateOperationDto): Promise<OperationDetailDto[]>;
    getClientWithMostOrders(): Promise<any[]>;
}
