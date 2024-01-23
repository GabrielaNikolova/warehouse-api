import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { Product } from './entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OperationDetailsModule } from 'src/operation-details/operation-details.module';

@Module({
    imports: [TypeOrmModule.forFeature([Product]), OperationDetailsModule],
    controllers: [ProductController],
    providers: [ProductService],
    exports: [ProductService],
})
export class ProductModule {}
