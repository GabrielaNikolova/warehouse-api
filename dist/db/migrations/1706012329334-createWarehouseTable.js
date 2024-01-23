"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateWarehouseTable1706012329334 = void 0;
const product_warehouse_category_enum_1 = require("../../enum/product-warehouse-category.enum");
const typeorm_1 = require("typeorm");
class CreateWarehouseTable1706012329334 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'warehouse',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'uuid',
                },
                {
                    name: 'name',
                    type: 'varchar',
                    length: '200',
                },
                {
                    name: 'type',
                    type: 'enum',
                    enumName: 'product_warehouse_category',
                    enum: [product_warehouse_category_enum_1.ProductWarehouseCategory.LIQUID, product_warehouse_category_enum_1.ProductWarehouseCategory.SOLID],
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'now()',
                },
                {
                    name: 'updated_at',
                    type: 'timestamp',
                    default: 'now()',
                },
                {
                    name: 'deleted_at',
                    type: 'timestamp',
                    isNullable: true,
                },
            ],
        }), true);
    }
    async down(queryRunner) { }
}
exports.CreateWarehouseTable1706012329334 = CreateWarehouseTable1706012329334;
//# sourceMappingURL=1706012329334-createWarehouseTable.js.map