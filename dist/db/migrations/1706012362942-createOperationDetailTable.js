"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateOperationDetailTable1706012362942 = void 0;
const typeorm_1 = require("typeorm");
class CreateOperationDetailTable1706012362942 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'operation_detail',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'uuid',
                },
                {
                    name: 'product_price',
                    type: 'float',
                },
                {
                    name: 'product_quantity',
                    type: 'float',
                },
                {
                    name: 'operation_id',
                    type: 'uuid',
                },
                {
                    name: 'product_id',
                    type: 'uuid',
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
        await queryRunner.createForeignKey('operation_detail', new typeorm_1.TableForeignKey({
            columnNames: ['product_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'product',
        }));
        await queryRunner.createForeignKey('operation_detail', new typeorm_1.TableForeignKey({
            columnNames: ['operation_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'operation',
        }));
    }
    async down(queryRunner) { }
}
exports.CreateOperationDetailTable1706012362942 = CreateOperationDetailTable1706012362942;
//# sourceMappingURL=1706012362942-createOperationDetailTable.js.map