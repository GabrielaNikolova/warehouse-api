import { Client } from 'src/client/entities/client.entity';
import { OperationType } from 'src/enum/operation-type.enum';
import { Warehouse } from 'src/warehouse/entities/warehouse.entity';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';

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

    @ManyToOne(() => Client, (client) => client.id, { nullable: false })
    @JoinColumn({ name: 'client_id' })
    client: string;

    @ManyToOne(() => Warehouse, (warehouse) => warehouse.id, { nullable: false })
    @JoinColumn({ name: 'warehouse_id' })
    warehouse: string;

    @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
    created: Date;

    @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
    updated: Date;

    @DeleteDateColumn({ type: 'timestamp', name: 'deleted_at' })
    deleted: Date;
}
