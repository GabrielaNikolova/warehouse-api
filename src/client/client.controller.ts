import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { UserRole } from 'src/enum/user-role.enum';
import { HasRoles } from 'src/util/decorator/has-roles.decorator';
import { RolesGuard } from 'src/util/guard/role.guard';

@UseGuards(RolesGuard)
@Controller('client')
export class ClientController {
    constructor(private readonly clientService: ClientService) {}

    @Get()
    async findAll() {
        return await this.clientService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
        return await this.clientService.findOne(id);
    }

    @HasRoles(UserRole.OWNER, UserRole.OPERATOR)
    @Post('/create')
    async create(@Body() createClientDto: CreateClientDto) {
        return await this.clientService.create(createClientDto);
    }

    @HasRoles(UserRole.OWNER, UserRole.OPERATOR)
    @Patch(':id')
    async update(@Param('id', new ParseUUIDPipe()) id: string, @Body() updateClientDto: UpdateClientDto) {
        return await this.clientService.update(id, updateClientDto);
    }

    @HasRoles(UserRole.OWNER, UserRole.OPERATOR)
    @Delete(':id')
    async delete(@Param('id', new ParseUUIDPipe()) id: string) {
        return await this.clientService.delete(id);
    }

    @HasRoles(UserRole.OWNER)
    @Delete('/del/:id')
    async permDelete(@Param('id', new ParseUUIDPipe()) id: string) {
        return await this.clientService.permDelete(id);
    }
}
