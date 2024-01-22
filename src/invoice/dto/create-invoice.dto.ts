import { IsNotEmpty, IsString, MinLength, MaxLength, IsDate, IsOptional } from 'class-validator';
import { isUnique } from 'src/util/decorator/is-unique.decorator';

export class CreateInvoiceDto {
    @IsNotEmpty()
    @isUnique({ tableName: 'invoice', column: 'number' })
    @IsString({ message: 'Invoice number must be in string format' })
    @MinLength(5, {
        message: 'Invoice number is too short',
    })
    @MaxLength(10, {
        message: 'Invoice number is too long',
    })
    number: string;

    @IsNotEmpty()
    @IsDate()
    date: Date;

    @IsOptional()
    operation: string;
}
