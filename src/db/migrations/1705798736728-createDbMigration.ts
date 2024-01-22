import { ProductWarehouseCategory } from 'src/enum/product-warehouse-category.enum';
import { UserRole } from 'src/enum/user-role.enum';
import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex } from 'typeorm';

export class CreateDbMigration1705798736728 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'user',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'uuid',
                    },
                    {
                        name: 'username',
                        type: 'varchar',
                        length: '20',
                        isUnique: true,
                        isNullable: false,
                    },
                    {
                        name: 'email',
                        type: 'varchar',
                        length: '30',
                        isUnique: true,
                        isNullable: false,
                    },
                    {
                        name: 'password',
                        type: 'varchar',
                        length: '300',
                        isNullable: false,
                    },
                    {
                        name: 'role',
                        type: 'enum',
                        enumName: 'user_role',
                        enum: [UserRole.OPERATOR, UserRole.VIEWER, UserRole.OWNER],
                        default: `'viewer'`,
                        isNullable: false,
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
                        isNullable: false,
                    },
                    {
                        name: 'type',
                        type: 'varchar',
                        length: '150',
                        isNullable: false,
                    },
                    {
                        name: 'unit',
                        type: 'varchar',
                        length: '20',
                        isNullable: false,
                    },
                    {
                        name: 'category',
                        type: 'enum',
                        enumName: 'product_warehouse_category',
                        enum: [ProductWarehouseCategory.LIQUID, ProductWarehouseCategory.SOLID],
                        isNullable: false,
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
                        isUnique: true,
                        isNullable: false,
                    },
                    {
                        name: 'type',
                        type: 'enum',
                        enumName: 'product_warehouse_category',
                        enum: [ProductWarehouseCategory.LIQUID, ProductWarehouseCategory.SOLID],
                        isNullable: false,
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

        await queryRunner.createTable(
            new Table({
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
                        isUnique: true,
                        isNullable: false,
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
                        isNullable: false,
                    },
                    {
                        name: 'uic',
                        type: 'varchar',
                        length: '20',
                        isUnique: true,
                        isNullable: false,
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
                        isNullable: false,
                    },
                    {
                        name: 'is_transfer',
                        type: 'boolean',
                        default: false,
                        isNullable: false,
                    },
                    {
                        name: 'date',
                        type: 'timestamp',
                        isNullable: false,
                    },
                    {
                        name: 'client_id',
                        type: 'uuid',
                        isNullable: false,
                    },
                    {
                        name: 'warehouse_id',
                        type: 'uuid',
                        isNullable: false,
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

        await queryRunner.createIndex(
            'client_id',
            new TableIndex({
                name: 'IDX_CLIENT_ID',
                columnNames: ['client_id'],
            }),
        );

        await queryRunner.createForeignKey(
            'operation',
            new TableForeignKey({
                columnNames: ['client_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'client',
            }),
        );

        await queryRunner.createIndex(
            'warehouse_id',
            new TableIndex({
                name: 'IDX_WAREHOUSE_ID',
                columnNames: ['warehouse_id'],
            }),
        );

        await queryRunner.createForeignKey(
            'operation',
            new TableForeignKey({
                columnNames: ['warehouse_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'warehouse',
            }),
        );

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
                        isNullable: false,
                    },
                    {
                        name: 'product_quantity',
                        type: 'float',
                        isNullable: false,
                    },
                    {
                        name: 'operation_id',
                        type: 'uuid',
                        isNullable: false,
                    },
                    {
                        name: 'product_id',
                        type: 'uuid',
                        isNullable: false,
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

        await queryRunner.createIndex(
            'product_id',
            new TableIndex({
                name: 'IDX_PRODUCT_ID',
                columnNames: ['product_id'],
            }),
        );

        await queryRunner.createForeignKey(
            'operation_detail',
            new TableForeignKey({
                columnNames: ['product_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'product',
            }),
        );
        await queryRunner.createIndex(
            'operation_id',
            new TableIndex({
                name: 'IDX_OPERATION_ID',
                columnNames: ['operation_id'],
            }),
        );

        await queryRunner.createForeignKey(
            'operation_detail',
            new TableForeignKey({
                columnNames: ['operation_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'operation',
            }),
        );

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
                        isNullable: false,
                    },
                    {
                        name: 'date',
                        type: 'timestamp',
                        isNullable: false,
                    },
                    {
                        name: 'operation_id',
                        type: 'uuid',
                        isNullable: false,
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

        await queryRunner.createIndex(
            'operation_id',
            new TableIndex({
                name: 'IDX_OPERATION_ID',
                columnNames: ['operation_id'],
            }),
        );

        await queryRunner.createForeignKey(
            'invoice',
            new TableForeignKey({
                columnNames: ['operation_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'operation',
            }),
        );
    }

    async down(queryRunner: QueryRunner): Promise<void> {
        const table2 = await queryRunner.getTable('operation_detail');
        const foreignKey2 = table2.foreignKeys.find((fk) => fk.columnNames.indexOf('product_id') !== -1);
        const foreignKey22 = table2.foreignKeys.find((fk) => fk.columnNames.indexOf('operation_id') !== -1);
        await queryRunner.dropForeignKey('operation_detail', foreignKey2);
        await queryRunner.dropForeignKey('operation_detail', foreignKey22);
        await queryRunner.dropColumn('operation_detail', 'product_id');
        await queryRunner.dropColumn('operation_detail', 'operation_id');
        await queryRunner.dropTable('operation_detail');

        const table3 = await queryRunner.getTable('operation');
        const foreignKey3 = table3.foreignKeys.find((fk) => fk.columnNames.indexOf('client_id') !== -1);
        const foreignKey33 = table3.foreignKeys.find((fk) => fk.columnNames.indexOf('warehouse_id') !== -1);
        await queryRunner.dropForeignKey('operation', foreignKey3);
        await queryRunner.dropForeignKey('operation', foreignKey33);
        await queryRunner.dropColumn('operation', 'client_id');
        await queryRunner.dropColumn('operation', 'warehouse_id');
        await queryRunner.dropTable('operation');

        const table1 = await queryRunner.getTable('invoice');
        const foreignKey1 = table1.foreignKeys.find((fk) => fk.columnNames.indexOf('operation_id') !== -1);
        await queryRunner.dropForeignKey('invoice', foreignKey1);
        await queryRunner.dropColumn('invoice', 'operation_id');
        await queryRunner.dropTable('invoice');
    }
}
