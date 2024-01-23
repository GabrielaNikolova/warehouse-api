"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserTable1706012302545 = void 0;
const user_role_enum_1 = require("../../enum/user-role.enum");
const typeorm_1 = require("typeorm");
class CreateUserTable1706012302545 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
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
                    enum: [user_role_enum_1.UserRole.OPERATOR, user_role_enum_1.UserRole.VIEWER, user_role_enum_1.UserRole.OWNER],
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
        }), true);
    }
    async down(queryRunner) { }
}
exports.CreateUserTable1706012302545 = CreateUserTable1706012302545;
//# sourceMappingURL=1706012302545-createUserTable.js.map