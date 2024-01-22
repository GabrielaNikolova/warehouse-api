import { Module } from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportController } from './report.controller';
import { OperationDetailsModule } from 'src/operation-details/operation-details.module';
import { OperationModule } from 'src/operation/operation.module';

@Module({
    imports: [OperationDetailsModule, OperationModule],
    controllers: [ReportController],
    providers: [ReportService],
})
export class ReportModule {}
