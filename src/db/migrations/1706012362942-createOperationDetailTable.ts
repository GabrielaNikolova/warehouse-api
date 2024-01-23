import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex } from 'typeorm';

export class CreateOperationDetailTable1706012362942 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
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
            }),
            true,
        );

        // await queryRunner.createIndex(
        //     'product_id',
        //     new TableIndex({
        //         name: 'IDX_PRODUCT_ID',
        //         columnNames: ['product_id'],
        //     }),
        // );

        await queryRunner.createForeignKey(
            'operation_detail',
            new TableForeignKey({
                columnNames: ['product_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'product',
            }),
        );
        // await queryRunner.createIndex(
        //     'operation_id',
        //     new TableIndex({
        //         name: 'IDX_OPERATION_ID',
        //         columnNames: ['operation_id'],
        //     }),
        // );

        await queryRunner.createForeignKey(
            'operation_detail',
            new TableForeignKey({
                columnNames: ['operation_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'operation',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {}
}
