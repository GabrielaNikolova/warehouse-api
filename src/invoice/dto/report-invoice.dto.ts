import { Expose } from 'class-transformer';

export class InvoiceReportDto {
    @Expose()
    id: string;

    @Expose()
    number: string;

    @Expose()
    date: Date;

    @Expose()
    operation: string;

    @Expose()
    created: Date;

    @Expose()
    updated: Date;

    @Expose()
    deleted: Date;
}
