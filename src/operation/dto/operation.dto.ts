import { IsNotEmpty, IsEnum, IsBoolean, IsOptional } from 'class-validator';
import { OperationType } from 'src/enum/operation-type.enum';

export class OperationDto {
    @IsNotEmpty()
    @IsEnum(OperationType)
    type: OperationType;

    @IsNotEmpty()
    date: Date;

    @IsNotEmpty()
    client: string;

    @IsNotEmpty()
    warehouse: string;

    @IsOptional()
    @IsBoolean()
    isTransfer: boolean;
}
