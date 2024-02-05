import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { UpdateWarehouseDto } from './dto/update-warehouse.dto';
import { Warehouse } from './entities/warehouse.entity';
import { Repository } from 'typeorm';
export declare class WarehouseService {
    private repo;
    constructor(repo: Repository<Warehouse>);
    findAll(): Promise<Warehouse[]>;
    findOne(id: string): Promise<Warehouse>;
    create(createWarehouseDto: CreateWarehouseDto): Promise<Warehouse>;
    update(id: string, updateWarehouseDto: UpdateWarehouseDto): Promise<Warehouse>;
    delete(id: string): Promise<Warehouse>;
    permDelete(id: string): Promise<Warehouse>;
}
