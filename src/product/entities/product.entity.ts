import { ProductWarehouseCategory } from 'src/enum/product-warehouse-category.enum';
import { PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, Entity } from 'typeorm';

@Entity('product')
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar', { length: 200 })
    name: string;

    @Column('enum', { enum: ProductWarehouseCategory })
    category: ProductWarehouseCategory;

    @Column('varchar', { length: 150 })
    type: string;

    @Column('varchar', { length: 20 })
    unit: string;

    @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
    created: Date;

    @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
    updated: Date;

    @DeleteDateColumn({ type: 'timestamp', name: 'deleted_at' })
    deleted: Date;
}
