import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex } from 'typeorm';

export class CreateInvoiceTable1706012370328 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
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
            }),
            true,
        );

        // await queryRunner.createIndex(
        //     'operation_id',
        //     new TableIndex({
        //         name: 'IDX_OPERATION_ID',
        //         columnNames: ['operation_id'],
        //     }),
        // );

        await queryRunner.createForeignKey(
            'invoice',
            new TableForeignKey({
                columnNames: ['operation_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'operation',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {}
}
