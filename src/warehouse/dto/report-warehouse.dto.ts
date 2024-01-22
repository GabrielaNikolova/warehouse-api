import { Expose } from 'class-transformer';

export class WarehouseReportDto {
    @Expose()
    id: string;

    @Expose()
    name: string;

    @Expose()
    type: string;

    @Expose()
    created: Date;

    @Expose()
    updated: Date;

    @Expose()
    deleted: Date;
}
