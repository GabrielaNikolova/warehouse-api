import { Expose } from 'class-transformer';

export class ProductReportDto {
    @Expose()
    id: string;

    @Expose()
    name: string;

    @Expose()
    category: string;

    @Expose()
    type: string;

    @Expose()
    unit: string;

    @Expose()
    created: Date;

    @Expose()
    updated: Date;

    @Expose()
    deleted: Date;
}
