import { Expose } from 'class-transformer';

export class OperationReportDto {
    @Expose()
    id: string;

    @Expose()
    type: string;

    @Expose()
    date: string;

    @Expose()
    client: string;

    @Expose()
    warehouse: string;

    @Expose()
    products: string[];

    @Expose()
    created: Date;

    @Expose()
    updated: Date;

    @Expose()
    deleted: Date;
}
