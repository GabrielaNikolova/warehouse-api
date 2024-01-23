"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateOperationTable1706012358419 = void 0;
const typeorm_1 = require("typeorm");
class CreateOperationTable1706012358419 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'operation',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'uuid',
                },
                {
                    name: 'type',
                    type: 'enum',
                    enum: ['delivery', 'stock picking', 'transfer'],
                },
                {
                    name: 'is_transfer',
                    type: 'boolean',
                    default: false,
                },
                {
                    name: 'date',
                    type: 'timestamp',
                },
                {
                    name: 'client_id',
                    type: 'uuid',
                },
                {
                    name: 'warehouse_id',
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
        await queryRunner.createForeignKey('operation', new typeorm_1.TableForeignKey({
            columnNames: ['client_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'client',
        }));
        await queryRunner.createForeignKey('operation', new typeorm_1.TableForeignKey({
            columnNames: ['warehouse_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'warehouse',
        }));
    }
    async down(queryRunner) { }
}
exports.CreateOperationTable1706012358419 = CreateOperationTable1706012358419;
//# sourceMappingURL=1706012358419-createOperationTable.js.map