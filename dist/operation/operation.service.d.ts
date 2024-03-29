import { CreateOperationDto } from './dto/create-operation.dto';
import { UpdateOperationDto } from './dto/update-operation.dto';
import { Operation } from './entities/operation.entity';
import { OperationReportDto } from './dto/report-operation.dto';
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
    create(createOperationDto: CreateOperationDto): Promise<OperationReportDto | OperationReportDto[]>;
    createOperation(createOperationDto: CreateOperationDto): Promise<Operation>;
    createOperationWithDetails(createOperationDto: CreateOperationDto, data: OperationDetailDto[]): Promise<OperationReportDto>;
    update(id: string, updateOperationDto: UpdateOperationDto): Promise<Operation>;
    delete(id: string): Promise<Operation>;
    permDelete(id: string): Promise<Operation>;
    getRequestedData(createOperationDto: CreateOperationDto): Promise<OperationDetailDto[]>;
    getClientWithMostOrders(): Promise<any[]>;
}
