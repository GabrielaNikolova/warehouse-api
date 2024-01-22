import { Operation } from 'src/operation/entities/operation.entity';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    OneToOne,
} from 'typeorm';

@Entity('invoice')
export class Invoice {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar', { length: 10, unique: true })
    number: string;

    @Column('timestamp')
    date: Date;

    @OneToOne(() => Operation, (operation) => operation.id, { nullable: false })
    @JoinColumn({ name: 'operation_id' })
    operation: string;

    @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
    created: Date;

    @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
    updated: Date;

    @DeleteDateColumn({ type: 'timestamp', name: 'deleted_at' })
    deleted: Date;
}
