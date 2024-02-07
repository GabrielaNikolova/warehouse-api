import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductWarehouseCategory } from 'src/enum/product-warehouse-category.enum';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    findAll(): Promise<import("./entities/product.entity").Product[]>;
    findByCategory(category?: ProductWarehouseCategory): Promise<import("./entities/product.entity").Product[]>;
    findOne(id: string): Promise<import("./entities/product.entity").Product>;
    create(createProductDto: CreateProductDto): Promise<import("./entities/product.entity").Product>;
    update(id: string, updateProductDto: UpdateProductDto): Promise<import("./entities/product.entity").Product>;
    delete(id: string): Promise<import("./entities/product.entity").Product>;
    permDelete(id: string): Promise<import("./entities/product.entity").Product>;
}
