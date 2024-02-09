import { Controller, Get, Body, Patch, Param, ParseUUIDPipe, UseGuards, Query } from '@nestjs/common';
import { OperationDetailsService } from './operation-details.service';
import { UpdateOperationDetailDto } from './dto/update-operation-detail.dto';
import { UserRole } from 'src/enum/user-role.enum';
import { HasRoles } from 'src/util/decorator/has-roles.decorator';
import { RolesGuard } from 'src/util/guard/role.guard';

@UseGuards(RolesGuard)
@Controller('operation-details')
export class OperationDetailsController {
    constructor(private readonly operationDetailsService: OperationDetailsService) {}

    @Get()
    async findAll() {
        return await this.operationDetailsService.findAll();
    }

    @HasRoles(UserRole.OWNER, UserRole.OPERATOR)
    @Get('/search')
    async findByOperation(@Query('opId') opId: string) {
        console.log('opId', opId);

        return await this.operationDetailsService.findAllByOperationId(opId);
    }

    @Get(':id')
    async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
        return await this.operationDetailsService.findOne(id);
    }

    @HasRoles(UserRole.OWNER, UserRole.OPERATOR)
    @Patch(':id')
    async update(
        @Param('id', new ParseUUIDPipe()) id: string,
        @Body() updateOperationDetailDto: UpdateOperationDetailDto,
    ) {
        return await this.operationDetailsService.update(id, updateOperationDetailDto);
    }
}
