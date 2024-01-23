import { ProductWarehouseCategory } from 'src/enum/product-warehouse-category.enum';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateWarehouseTable1706012329334 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
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
                        enum: [ProductWarehouseCategory.LIQUID, ProductWarehouseCategory.SOLID],
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
    }

    public async down(queryRunner: QueryRunner): Promise<void> {}
}
