import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

@Entity('invoice')
export class Invoice {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar', { length: 10, unique: true })
    number: string;

    @Column('timestamp')
    date: Date;

    @Column({ name: 'operation_id', nullable: false })
    operation: string;

    @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
    created: Date;

    @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
    updated: Date;

    @DeleteDateColumn({ type: 'timestamp', name: 'deleted_at' })
    deleted: Date;
}
