import { UserRole } from 'src/enum/user-role.enum';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('user')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar', { length: 20, unique: true })
    username: string;

    @Column('varchar', { length: 30, unique: true })
    email: string;

    @Column('varchar', { length: 300 })
    password: string;

    @Column('enum', { enum: UserRole, default: UserRole.VIEWER })
    role: UserRole;

    @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
    created: Date;

    @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
    updated: Date;

    @DeleteDateColumn({ type: 'timestamp', name: 'deleted_at' })
    deleted: Date;
}
