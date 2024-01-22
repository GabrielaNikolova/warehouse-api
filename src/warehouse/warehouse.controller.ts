import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { WarehouseService } from './warehouse.service';
import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { UpdateWarehouseDto } from './dto/update-warehouse.dto';
import { UserRole } from 'src/enum/user-role.enum';
import { HasRoles } from 'src/util/decorator/has-roles.decorator';
import { RolesGuard } from 'src/util/guard/role.guard';

@UseGuards(RolesGuard)
@Controller('warehouse')
export class WarehouseController {
    constructor(private readonly warehouseService: WarehouseService) {}

    @Get()
    async findAll() {
        return await this.warehouseService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
        return await this.warehouseService.findOne(id);
    }

    @HasRoles(UserRole.OWNER, UserRole.OPERATOR)
    @Post('/create')
    async create(@Body() createWarehouseDto: CreateWarehouseDto) {
        return await this.warehouseService.create(createWarehouseDto);
    }

    @HasRoles(UserRole.OWNER, UserRole.OPERATOR)
    @Patch(':id')
    async update(@Param('id', new ParseUUIDPipe()) id: string, @Body() updateWarehouseDto: UpdateWarehouseDto) {
        return await this.warehouseService.update(id, updateWarehouseDto);
    }

    @HasRoles(UserRole.OWNER, UserRole.OPERATOR)
    @Delete(':id')
    async delete(@Param('id', new ParseUUIDPipe()) id: string) {
        return await this.warehouseService.delete(id);
    }

    @HasRoles(UserRole.OWNER)
    @Delete('/del/:id')
    async permDelete(@Param('id', new ParseUUIDPipe()) id: string) {
        return await this.warehouseService.permDelete(id);
    }
}
