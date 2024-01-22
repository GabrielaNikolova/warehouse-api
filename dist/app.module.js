"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const user_module_1 = require("./user/user.module");
const warehouse_module_1 = require("./warehouse/warehouse.module");
const product_module_1 = require("./product/product.module");
const operation_module_1 = require("./operation/operation.module");
const invoice_module_1 = require("./invoice/invoice.module");
const client_module_1 = require("./client/client.module");
const operation_details_module_1 = require("./operation-details/operation-details.module");
const config_2 = require("./db/config");
const is_unique_validator_1 = require("./util/validator/is-unique.validator");
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const auth_guard_1 = require("./util/guard/auth.guard");
const report_module_1 = require("./report/report.module");
const http_exception_filter_1 = require("./util/filter/http-exception.filter");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [config_2.default],
                envFilePath: '.env',
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (configService) => configService.get('database'),
                inject: [config_1.ConfigService],
            }),
            user_module_1.UserModule,
            warehouse_module_1.WarehouseModule,
            product_module_1.ProductModule,
            operation_module_1.OperationModule,
            invoice_module_1.InvoiceModule,
            client_module_1.ClientModule,
            operation_details_module_1.OperationDetailsModule,
            report_module_1.ReportModule,
        ],
        providers: [
            is_unique_validator_1.IsUniqueConstraint,
            {
                provide: core_1.APP_PIPE,
                useClass: common_1.ValidationPipe,
            },
            {
                provide: core_1.APP_GUARD,
                useClass: auth_guard_1.AuthGuard,
            },
            {
                provide: core_1.APP_FILTER,
                useClass: http_exception_filter_1.HttpExceptionFilter,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map