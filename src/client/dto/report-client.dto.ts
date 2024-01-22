import { Expose } from 'class-transformer';

export class ClientReportDto {
    @Expose()
    id: string;

    @Expose()
    name: string;

    @Expose()
    address: string;

    @Expose()
    accountablePerson: string;

    @Expose()
    uic: string;

    @Expose()
    created: Date;

    @Expose()
    updated: Date;

    @Expose()
    deleted: Date;
}
