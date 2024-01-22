import { WarehouseService } from './warehouse.service';
import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { UpdateWarehouseDto } from './dto/update-warehouse.dto';
export declare class WarehouseController {
    private readonly warehouseService;
    constructor(warehouseService: WarehouseService);
    findAll(): Promise<import("./dto/report-warehouse.dto").WarehouseReportDto[]>;
    findOne(id: string): Promise<import("./entities/warehouse.entity").Warehouse>;
    create(createWarehouseDto: CreateWarehouseDto): Promise<import("./entities/warehouse.entity").Warehouse>;
    update(id: string, updateWarehouseDto: UpdateWarehouseDto): Promise<import("./entities/warehouse.entity").Warehouse>;
    delete(id: string): Promise<string>;
    permDelete(id: string): Promise<string>;
}
