import { Module } from '@nestjs/common';
import { OperationService } from './operation.service';
import { OperationController } from './operation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Operation } from './entities/operation.entity';
import { WarehouseModule } from 'src/warehouse/warehouse.module';
import { OperationDetailsModule } from 'src/operation-details/operation-details.module';
import { ProductModule } from 'src/product/product.module';
import { ClientModule } from 'src/client/client.module';
import { InvoiceModule } from 'src/invoice/invoice.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Operation]),
        WarehouseModule,
        OperationDetailsModule,
        ProductModule,
        ClientModule,
        InvoiceModule,
    ],
    controllers: [OperationController],
    providers: [OperationService],
    exports: [OperationService],
})
export class OperationModule {}
