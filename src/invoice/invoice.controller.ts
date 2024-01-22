import { Controller, Get, Body, Patch, Param, Delete, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { UserRole } from 'src/enum/user-role.enum';
import { HasRoles } from 'src/util/decorator/has-roles.decorator';
import { RolesGuard } from 'src/util/guard/role.guard';

@UseGuards(RolesGuard)
@Controller('invoice')
export class InvoiceController {
    constructor(private readonly invoiceService: InvoiceService) {}

    @Get()
    async findAll() {
        return await this.invoiceService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
        return await this.invoiceService.findOne(id);
    }

    @HasRoles(UserRole.OWNER, UserRole.OPERATOR)
    @Patch(':id')
    async update(@Param('id', new ParseUUIDPipe()) id: string, @Body() updateInvoiceDto: UpdateInvoiceDto) {
        return await this.invoiceService.update(id, updateInvoiceDto);
    }

    @HasRoles(UserRole.OWNER, UserRole.OPERATOR)
    @Delete(':id')
    async delete(@Param('id', new ParseUUIDPipe()) id: string) {
        return await this.invoiceService.delete(id);
    }

    @HasRoles(UserRole.OWNER)
    @Delete('/del/:id')
    async permDelete(@Param('id', new ParseUUIDPipe()) id: string) {
        return await this.invoiceService.permDelete(id);
    }
}
