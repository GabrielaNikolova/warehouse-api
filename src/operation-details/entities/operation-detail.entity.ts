import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('operation_detail')
export class OperationDetail {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('float', { name: 'product_quantity' })
    productQuantity: number;

    @Column('float', { name: 'product_price' })
    productPrice: number;

    @Column({ name: 'operation_id', nullable: false })
    operation: string;

    @Column({ name: 'product_id', nullable: false })
    product: string;

    @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
    created: Date;

    @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
    updated: Date;

    @DeleteDateColumn({ type: 'timestamp', name: 'deleted_at' })
    deleted: Date;
}
