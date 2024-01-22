import { IsNotEmpty, IsString, MinLength, MaxLength, IsEnum } from 'class-validator';
import { ProductWarehouseCategory } from 'src/enum/product-warehouse-category.enum';

export class CreateProductDto {
    @IsNotEmpty()
    @IsString({ message: 'Name must be a string' })
    @MinLength(5, {
        message: 'Name is too short',
    })
    @MaxLength(200, {
        message: 'Name is too long',
    })
    name: string;

    @IsNotEmpty()
    @IsEnum(ProductWarehouseCategory)
    category: ProductWarehouseCategory;

    @IsNotEmpty()
    @IsString({ message: 'Type must be a string' })
    type: string;

    @IsNotEmpty()
    @IsString({ message: 'Unit must be a string' })
    unit: string;
}
