"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProductTable1706012335565 = void 0;
const product_warehouse_category_enum_1 = require("../../enum/product-warehouse-category.enum");
const typeorm_1 = require("typeorm");
class CreateProductTable1706012335565 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'product',
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
                    type: 'varchar',
                    length: '150',
                },
                {
                    name: 'unit',
                    type: 'varchar',
                    length: '20',
                },
                {
                    name: 'category',
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
exports.CreateProductTable1706012335565 = CreateProductTable1706012335565;
//# sourceMappingURL=1706012335565-createProductTable.js.map