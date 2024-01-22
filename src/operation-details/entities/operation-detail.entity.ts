import { Operation } from 'src/operation/entities/operation.entity';
import { Product } from 'src/product/entities/product.entity';
import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('operation_detail')
export class OperationDetail {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('float', { name: 'product_quantity' })
    productQuantity: number;

    @Column('float', { name: 'product_price' })
    productPrice: number;

    @ManyToOne(() => Operation, (operation) => operation.id, { nullable: false })
    @JoinColumn({ name: 'operation_id' })
    operation: string;

    @ManyToOne(() => Product, (product) => product.id, { nullable: false })
    @JoinColumn({ name: 'product_id' })
    product: string;

    @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
    created: Date;

    @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
    updated: Date;

    @DeleteDateColumn({ type: 'timestamp', name: 'deleted_at' })
    deleted: Date;
}
