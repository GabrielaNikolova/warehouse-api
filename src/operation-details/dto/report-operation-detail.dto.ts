import { Expose } from 'class-transformer';

export class OperationDetailReportDto {
    @Expose()
    id: string;

    @Expose()
    productQuantity: string;

    @Expose()
    productPrice: string;

    @Expose()
    operation: string;

    @Expose()
    product: string;

    @Expose()
    created: Date;

    @Expose()
    updated: Date;

    @Expose()
    deleted: Date;
}
