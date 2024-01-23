import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex } from 'typeorm';

export class CreateOperationTable1706012358419 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
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
            }),
            true,
        );

        await queryRunner.createForeignKey(
            'operation',
            new TableForeignKey({
                columnNames: ['client_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'client',
            }),
        );

        // await queryRunner.createIndex(
        //     'client',
        //     new TableIndex({
        //         name: 'IDX_CLIENT_ID',
        //         columnNames: ['client_id'],
        //     }),
        // );

        await queryRunner.createForeignKey(
            'operation',
            new TableForeignKey({
                columnNames: ['warehouse_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'warehouse',
            }),
        );
        // await queryRunner.createIndex(
        //     'warehouse',
        //     new TableIndex({
        //         name: 'IDX_WAREHOUSE_ID',
        //         columnNames: ['warehouse_id'],
        //     }),
        // );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {}
}
