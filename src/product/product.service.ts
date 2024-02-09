import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { CreateOperationDetailDto } from 'src/operation-details/dto/create-operation-detail.dto';
import { OperationDetailDto } from 'src/operation-details/dto/operation-detail.dto';
import { OperationDetailsService } from 'src/operation-details/operation-details.service';
import { ProductWarehouseCategory } from 'src/enum/product-warehouse-category.enum';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product) private repo: Repository<Product>,
        private operationDetailService: OperationDetailsService,
    ) {}

    async findAll() {
        const products = await this.repo.find();
        if (!products) {
            throw new NotFoundException(`There are no products records in the database`);
        }

        return products;
    }

    async findOne(id: string) {
        const product = await this.repo.findOneBy({ id });
        if (!product) {
            throw new NotFoundException(`Product with id: ${id} was not found`);
        }
        return product;
    }

    async findAllByCategory(cat: ProductWarehouseCategory) {
        console.log('gategory', cat);

        const products = await this.repo.find({ where: { category: cat } });
        if (!products) {
            throw new NotFoundException(`There are no products with category ${cat}`);
        }

        return products;
    }

    async create(createProductDto: CreateProductDto) {
        const product = this.repo.create(createProductDto);
        return await this.repo.save(product);
    }

    async update(id: string, updateProductDto: UpdateProductDto) {
        const product = await this.findOne(id);
        if (product.category !== updateProductDto.category) {
            const productExists = await this.operationDetailService.checkDetailsForProductId(id);
            if (productExists) {
                updateProductDto.category = product.category;
            }
        }

        Object.assign(product, updateProductDto);
        return this.repo.save(product);
    }

    async delete(id: string) {
        const product = await this.findOne(id);
        return await this.repo.softRemove(product);
    }

    async permDelete(id: string) {
        const product = await this.findOne(id);
        return this.repo.remove(product);
    }

    async findProductsByIds(array: CreateOperationDetailDto[], type: string) {
        const existingProducts: OperationDetailDto[] = [];

        for (const p of array) {
            const product = await this.findOne(p.product);

            if (product && product.category === type) {
                const productDetail = new OperationDetailDto();
                productDetail.productPrice = p.productPrice;
                productDetail.productQuantity = p.productQuantity;
                productDetail.product = product.id;
                existingProducts.push(productDetail);
            }
        }
        return existingProducts;
    }
}
