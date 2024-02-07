"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const product_entity_1 = require("./entities/product.entity");
const typeorm_2 = require("typeorm");
const operation_detail_dto_1 = require("../operation-details/dto/operation-detail.dto");
const operation_details_service_1 = require("../operation-details/operation-details.service");
let ProductService = class ProductService {
    constructor(repo, operationDetailService) {
        this.repo = repo;
        this.operationDetailService = operationDetailService;
    }
    async findAll() {
        const products = await this.repo.find();
        if (!products) {
            throw new common_1.NotFoundException(`There are no products records in the database`);
        }
        return products;
    }
    async findOne(id) {
        const product = await this.repo.findOneBy({ id });
        if (!product) {
            throw new common_1.NotFoundException(`Product with id: ${id} was not found`);
        }
        return product;
    }
    async findAllByCategory(cat) {
        console.log('gategory', cat);
        const products = await this.repo.find({ where: { category: cat } });
        if (!products) {
            throw new common_1.NotFoundException(`There are no products with category ${cat}`);
        }
        return products;
    }
    async create(createProductDto) {
        const product = this.repo.create(createProductDto);
        return await this.repo.save(product);
    }
    async update(id, updateProductDto) {
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
    async delete(id) {
        const product = await this.findOne(id);
        return await this.repo.softRemove(product);
    }
    async permDelete(id) {
        const product = await this.findOne(id);
        return this.repo.remove(product);
    }
    async findProductsByIds(array, type) {
        const existingProducts = [];
        for (const p of array) {
            const product = await this.findOne(p.product);
            if (product && product.category === type) {
                const productDetail = new operation_detail_dto_1.OperationDetailDto();
                productDetail.productPrice = p.productPrice;
                productDetail.productQuantity = p.productQuantity;
                productDetail.product = product.id;
                existingProducts.push(productDetail);
            }
        }
        return existingProducts;
    }
};
exports.ProductService = ProductService;
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        operation_details_service_1.OperationDetailsService])
], ProductService);
//# sourceMappingURL=product.service.js.map