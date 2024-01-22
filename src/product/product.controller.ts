import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseUUIDPipe } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { HasRoles } from 'src/util/decorator/has-roles.decorator';
import { UserRole } from 'src/enum/user-role.enum';
import { RolesGuard } from 'src/util/guard/role.guard';

@UseGuards(RolesGuard)
@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Get()
    async findAll() {
        return await this.productService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
        return await this.productService.findOne(id);
    }
    @HasRoles(UserRole.OWNER, UserRole.OPERATOR)
    @Post('/create')
    async create(@Body() createProductDto: CreateProductDto) {
        return await this.productService.create(createProductDto);
    }

    @HasRoles(UserRole.OWNER, UserRole.OPERATOR)
    @Patch(':id')
    async update(@Param('id', new ParseUUIDPipe()) id: string, @Body() updateProductDto: UpdateProductDto) {
        return await this.productService.update(id, updateProductDto);
    }

    @HasRoles(UserRole.OWNER, UserRole.OPERATOR)
    @Delete(':id')
    async delete(@Param('id', new ParseUUIDPipe()) id: string) {
        return await this.productService.delete(id);
    }

    @HasRoles(UserRole.OWNER)
    @Delete('/del/:id')
    async permDelete(@Param('id', new ParseUUIDPipe()) id: string) {
        return await this.productService.permDelete(id);
    }
}
