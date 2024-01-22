import { ProductWarehouseCategory } from 'src/enum/product-warehouse-category.enum';
export declare class Product {
    id: string;
    name: string;
    category: ProductWarehouseCategory;
    type: string;
    unit: string;
    created: Date;
    updated: Date;
    deleted: Date;
}
