import { UserRole } from 'src/enum/user-role.enum';
export declare class User {
    id: string;
    username: string;
    email: string;
    password: string;
    role: UserRole;
    created: Date;
    updated: Date;
    deleted: Date;
}
