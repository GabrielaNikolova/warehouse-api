import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { WarehouseModule } from './warehouse/warehouse.module';
import { ProductModule } from './product/product.module';
import { OperationModule } from './operation/operation.module';
import { InvoiceModule } from './invoice/invoice.module';
import { ClientModule } from './client/client.module';
import { OperationDetailsModule } from './operation-details/operation-details.module';
import dbConfig from './db/config';
import { IsUniqueConstraint } from './util/validator/is-unique.validator';
import { APP_FILTER, APP_GUARD, APP_PIPE } from '@nestjs/core';
import { Module, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from './util/guard/auth.guard';
import { ReportModule } from './report/report.module';
import { HttpExceptionFilter } from './util/filter/http-exception.filter';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [dbConfig],
            envFilePath: '.env',
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => configService.get('database')!,
            inject: [ConfigService],
        }),
        UserModule,
        WarehouseModule,
        ProductModule,
        OperationModule,
        InvoiceModule,
        ClientModule,
        OperationDetailsModule,
        ReportModule,
    ],
    providers: [
        IsUniqueConstraint,
        {
            provide: APP_PIPE,
            useClass: ValidationPipe,
        },
        {
            provide: APP_GUARD,
            useClass: AuthGuard,
        },
        {
            provide: APP_FILTER,
            useClass: HttpExceptionFilter,
        },
    ],
})
export class AppModule {}
