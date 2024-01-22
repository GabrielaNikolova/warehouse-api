import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class OperationDetailDto {
    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    productQuantity: number;

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    productPrice: number;

    // @IsNotEmpty()
    operation: string;

    @IsNotEmpty()
    product: string;
}
