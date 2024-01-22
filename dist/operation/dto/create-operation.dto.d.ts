import { OperationType } from 'src/enum/operation-type.enum';
import { CreateOperationDetailDto } from 'src/operation-details/dto/create-operation-detail.dto';
export declare class CreateOperationDto {
    type: OperationType;
    date: Date;
    client: string;
    warehouse: string;
    warehouseIn: string;
    products: CreateOperationDetailDto[];
    isTransfer: boolean;
}
