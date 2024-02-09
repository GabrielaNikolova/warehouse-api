import { Type } from 'class-transformer';
import { IsNotEmpty, IsEnum, IsUUID, IsDate, IsBoolean, IsOptional } from 'class-validator';
import { OperationType } from 'src/enum/operation-type.enum';
import { CreateOperationDetailDto } from 'src/operation-details/dto/create-operation-detail.dto';

export class CreateOperationDto {
    @IsNotEmpty()
    @IsEnum(OperationType)
    type: OperationType;

    @IsNotEmpty()
    @Type(() => Date)
    @IsDate()
    date: Date;

    @IsNotEmpty()
    @IsUUID()
    client: string;

    @IsNotEmpty()
    @IsUUID()
    warehouse: string;

    //if type is transfer - the warehouse to which we deliver the products should be specified
    @IsOptional()
    //@IsUUID()
    warehouseIn: string;

    @IsNotEmpty()
    products: CreateOperationDetailDto[];

    @IsOptional()
    @IsBoolean()
    isTransfer: boolean;
}
