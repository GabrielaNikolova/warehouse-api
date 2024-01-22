import { OperationType } from 'src/enum/operation-type.enum';
export declare class OperationDto {
    type: OperationType;
    date: Date;
    client: string;
    warehouse: string;
    isTransfer: boolean;
}
