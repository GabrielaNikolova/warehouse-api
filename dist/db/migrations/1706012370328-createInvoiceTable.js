"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateInvoiceTable1706012370328 = void 0;
const typeorm_1 = require("typeorm");
class CreateInvoiceTable1706012370328 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'invoice',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'uuid',
                },
                {
                    name: 'number',
                    type: 'varchar',
                    length: '10',
                    isUnique: true,
                },
                {
                    name: 'date',
                    type: 'timestamp',
                },
                {
                    name: 'operation_id',
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
        await queryRunner.createForeignKey('invoice', new typeorm_1.TableForeignKey({
            columnNames: ['operation_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'operation',
        }));
    }
    async down(queryRunner) { }
}
exports.CreateInvoiceTable1706012370328 = CreateInvoiceTable1706012370328;
//# sourceMappingURL=1706012370328-createInvoiceTable.js.map