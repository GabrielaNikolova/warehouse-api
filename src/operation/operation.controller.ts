import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { OperationService } from './operation.service';
import { CreateOperationDto } from './dto/create-operation.dto';
import { UpdateOperationDto } from './dto/update-operation.dto';
import { UserRole } from 'src/enum/user-role.enum';
import { HasRoles } from 'src/util/decorator/has-roles.decorator';
import { RolesGuard } from 'src/util/guard/role.guard';

@UseGuards(RolesGuard)
@Controller('operation')
export class OperationController {
    constructor(private readonly operationService: OperationService) {}

    @Get()
    async findAll() {
        return await this.operationService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
        return await this.operationService.findOne(id);
    }

    @HasRoles(UserRole.OWNER, UserRole.OPERATOR)
    @Post('/create')
    async create(@Body() createOperationDto: CreateOperationDto) {
        return await this.operationService.create(createOperationDto);
    }

    @HasRoles(UserRole.OWNER, UserRole.OPERATOR)
    @Patch(':id')
    async update(@Param('id', new ParseUUIDPipe()) id: string, @Body() updateOperationDto: UpdateOperationDto) {
        return await this.operationService.update(id, updateOperationDto);
    }

    @HasRoles(UserRole.OWNER, UserRole.OPERATOR)
    @Delete(':id')
    async delete(@Param('id', new ParseUUIDPipe()) id: string) {
        return await this.operationService.delete(id);
    }

    @HasRoles(UserRole.OWNER)
    @Delete('/del/:id')
    async permDelete(@Param('id', new ParseUUIDPipe()) id: string) {
        return await this.operationService.permDelete(id);
    }
}
