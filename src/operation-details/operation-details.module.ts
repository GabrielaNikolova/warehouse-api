import { Module } from '@nestjs/common';
import { OperationDetailsService } from './operation-details.service';
import { OperationDetailsController } from './operation-details.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OperationDetail } from './entities/operation-detail.entity';
import { WarehouseModule } from 'src/warehouse/warehouse.module';

@Module({
    imports: [TypeOrmModule.forFeature([OperationDetail]), WarehouseModule],
    controllers: [OperationDetailsController],
    providers: [OperationDetailsService],
    exports: [OperationDetailsService],
})
export class OperationDetailsModule {}
