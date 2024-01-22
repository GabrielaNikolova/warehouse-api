import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { UpdateWarehouseDto } from './dto/update-warehouse.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Warehouse } from './entities/warehouse.entity';
import { Repository } from 'typeorm';
import { WarehouseReportDto } from './dto/report-warehouse.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class WarehouseService {
    constructor(@InjectRepository(Warehouse) private repo: Repository<Warehouse>) {}

    async findAll() {
        const warehouses = await this.repo.find();

        const output = warehouses.map((w) => {
            return plainToInstance(WarehouseReportDto, w, {
                excludeExtraneousValues: true,
            });
        });

        return output;
    }

    async findOne(id: string) {
        const warehouse = await this.repo.findOneBy({ id });
        if (!warehouse) {
            throw new NotFoundException(`Warehouse with id: ${id} was not found`);
        }
        return warehouse;
    }

    async create(createWarehouseDto: CreateWarehouseDto) {
        const warehouse = this.repo.create(createWarehouseDto);
        return await this.repo.save(warehouse);
    }

    async update(id: string, updateWarehouseDto: UpdateWarehouseDto) {
        const warehouse = await this.findOne(id);
        Object.assign(warehouse, updateWarehouseDto);
        return await this.repo.save(warehouse);
    }

    async delete(id: string) {
        const warehouse = await this.findOne(id);
        await this.repo.createQueryBuilder().softDelete().where({ id: warehouse.id }).execute();

        return warehouse.id;
    }

    async permDelete(id: string) {
        const warehouse = await this.findOne(id);
        this.repo.remove(warehouse);

        return warehouse.id;
    }
}
