import { UserRole } from 'src/enum/user-role.enum';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUserTable1706012302545 implements MigrationInterface {
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
                    },
                    {
                        name: 'email',
                        type: 'varchar',
                        length: '30',
                    },
                    {
                        name: 'password',
                        type: 'varchar',
                        length: '300',
                    },
                    {
                        name: 'role',
                        type: 'enum',
                        enumName: 'user_role',
                        enum: [UserRole.OPERATOR, UserRole.VIEWER, UserRole.OWNER],
                        default: `'viewer'`,
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
