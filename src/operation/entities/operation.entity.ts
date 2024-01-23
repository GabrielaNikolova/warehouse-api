import { OperationType } from 'src/enum/operation-type.enum';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

@Entity('operation')
export class Operation {
    constructor() {}

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('enum', { enum: OperationType })
    type: OperationType;

    @Column('boolean', { name: 'is_transfer', default: false })
    isTransfer: boolean;

    @Column('timestamp')
    date: Date;

    @Column({ name: 'client_id', nullable: false })
    client: string;

    @Column({ name: 'warehouse_id', nullable: false })
    warehouse: string;

    @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
    created: Date;

    @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
    updated: Date;

    @DeleteDateColumn({ type: 'timestamp', name: 'deleted_at' })
    deleted: Date;
}
