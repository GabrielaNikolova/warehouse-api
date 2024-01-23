import { Module } from '@nestjs/common';
import { ReportController } from './report.controller';
import { OperationDetailsModule } from 'src/operation-details/operation-details.module';
import { OperationModule } from 'src/operation/operation.module';

@Module({
    imports: [OperationDetailsModule, OperationModule],
    controllers: [ReportController],
})
export class ReportModule {}
