import { OperationType } from 'src/enum/operation-type.enum';
export declare class Operation {
    constructor();
    id: string;
    type: OperationType;
    isTransfer: boolean;
    date: Date;
    client: string;
    warehouse: string;
    created: Date;
    updated: Date;
    deleted: Date;
}
