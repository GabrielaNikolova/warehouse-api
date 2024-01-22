import { IsNotEmpty, IsString, MinLength, MaxLength, IsEnum } from 'class-validator';
import { ProductWarehouseCategory } from 'src/enum/product-warehouse-category.enum';
import { isUnique } from 'src/util/decorator/is-unique.decorator';

export class CreateWarehouseDto {
    @IsNotEmpty()
    @isUnique({ tableName: 'warehouse', column: 'name' })
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
    type: ProductWarehouseCategory;
}
