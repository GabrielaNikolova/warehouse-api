import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { ProductReportDto } from './dto/report-product.dto';
import { CreateOperationDetailDto } from 'src/operation-details/dto/create-operation-detail.dto';
import { OperationDetailDto } from 'src/operation-details/dto/operation-detail.dto';
export declare class ProductService {
    private repo;
    constructor(repo: Repository<Product>);
    findAll(): Promise<ProductReportDto[]>;
    findOne(id: string): Promise<Product>;
    create(createProductDto: CreateProductDto): Promise<Product>;
    update(id: string, updateProductDto: UpdateProductDto): Promise<Product>;
    delete(id: string): Promise<string>;
    permDelete(id: string): Promise<string>;
    findProductsByIds(array: CreateOperationDetailDto[], type: string): Promise<OperationDetailDto[]>;
}
