import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { CreateOperationDetailDto } from 'src/operation-details/dto/create-operation-detail.dto';
import { OperationDetailDto } from 'src/operation-details/dto/operation-detail.dto';
import { OperationDetailsService } from 'src/operation-details/operation-details.service';
export declare class ProductService {
    private repo;
    private operationDetailService;
    constructor(repo: Repository<Product>, operationDetailService: OperationDetailsService);
    findAll(): Promise<Product[]>;
    findOne(id: string): Promise<Product>;
    create(createProductDto: CreateProductDto): Promise<Product>;
    update(id: string, updateProductDto: UpdateProductDto): Promise<Product>;
    delete(id: string): Promise<Product>;
    permDelete(id: string): Promise<Product>;
    findProductsByIds(array: CreateOperationDetailDto[], type: string): Promise<OperationDetailDto[]>;
}
