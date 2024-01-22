import { ProductWarehouseCategory } from 'src/enum/product-warehouse-category.enum';
export declare class Warehouse {
    id: string;
    name: string;
    type: ProductWarehouseCategory;
    created: Date;
    updated: Date;
    deleted: Date;
}
