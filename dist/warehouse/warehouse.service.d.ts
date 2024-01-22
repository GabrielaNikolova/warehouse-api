import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { UpdateWarehouseDto } from './dto/update-warehouse.dto';
import { Warehouse } from './entities/warehouse.entity';
import { Repository } from 'typeorm';
import { WarehouseReportDto } from './dto/report-warehouse.dto';
export declare class WarehouseService {
    private repo;
    constructor(repo: Repository<Warehouse>);
    findAll(): Promise<WarehouseReportDto[]>;
    findOne(id: string): Promise<Warehouse>;
    create(createWarehouseDto: CreateWarehouseDto): Promise<Warehouse>;
    update(id: string, updateWarehouseDto: UpdateWarehouseDto): Promise<Warehouse>;
    delete(id: string): Promise<string>;
    permDelete(id: string): Promise<string>;
}
