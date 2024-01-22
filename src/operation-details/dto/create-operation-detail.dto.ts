import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsUUID } from 'class-validator';

export class CreateOperationDetailDto {
    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    productQuantity: number;

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    productPrice: number;

    @IsOptional()
    @IsUUID()
    operation: string;

    @IsNotEmpty()
    @IsUUID()
    product: string;
}
