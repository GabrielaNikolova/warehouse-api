"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateClientTable1706012319030 = void 0;
const typeorm_1 = require("typeorm");
class CreateClientTable1706012319030 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'client',
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
                    length: '100',
                },
                {
                    name: 'address',
                    type: 'varchar',
                    length: '350',
                    isNullable: true,
                },
                {
                    name: 'accountable_person',
                    type: 'varchar',
                },
                {
                    name: 'uic',
                    type: 'varchar',
                    length: '20',
                    isUnique: true,
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
exports.CreateClientTable1706012319030 = CreateClientTable1706012319030;
//# sourceMappingURL=1706012319030-createClientTable.js.map