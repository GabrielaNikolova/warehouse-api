import { ProductWarehouseCategory } from 'src/enum/product-warehouse-category.enum';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateProductTable1706012335565 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
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
