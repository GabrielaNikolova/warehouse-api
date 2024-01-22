import { ProductWarehouseCategory } from 'src/enum/product-warehouse-category.enum';
export declare class CreateProductDto {
    name: string;
    category: ProductWarehouseCategory;
    type: string;
    unit: string;
}
