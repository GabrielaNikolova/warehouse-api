import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { ProductReportDto } from './dto/report-product.dto';
import { CreateOperationDetailDto } from 'src/operation-details/dto/create-operation-detail.dto';
import { OperationDetailDto } from 'src/operation-details/dto/operation-detail.dto';

@Injectable()
export class ProductService {
    constructor(@InjectRepository(Product) private repo: Repository<Product>) {}

    async findAll() {
        const products = await this.repo.find();
        if (!products) {
            throw new NotFoundException(`There are no products records in the database`);
        }

        const output = products.map((p) => {
            return plainToInstance(ProductReportDto, p, {
                excludeExtraneousValues: true,
            });
        });

        return output;
    }

    async findOne(id: string) {
        const product = await this.repo.findOneBy({ id });
        if (!product) {
            throw new NotFoundException(`Product with id: ${id} was not found`);
        }
        return product;
    }

    async create(createProductDto: CreateProductDto) {
        const product = this.repo.create(createProductDto);
        return await this.repo.save(product);
    }

    async update(id: string, updateProductDto: UpdateProductDto) {
        const product = await this.findOne(id);
        Object.assign(product, updateProductDto);
        return this.repo.save(product);
    }

    async delete(id: string) {
        const product = await this.findOne(id);
        await this.repo.createQueryBuilder().softDelete().where({ id: product.id }).execute();

        return product.id;
    }

    async permDelete(id: string) {
        const product = await this.findOne(id);
        this.repo.remove(product);

        return product.id;
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
