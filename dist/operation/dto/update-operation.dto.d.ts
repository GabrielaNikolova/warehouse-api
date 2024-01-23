import { CreateOperationDto } from './create-operation.dto';
declare const UpdateOperationDto_base: import("@nestjs/mapped-types").MappedType<Partial<Omit<CreateOperationDto, "warehouse" | "type" | "isTransfer">>>;
export declare class UpdateOperationDto extends UpdateOperationDto_base {
}
export {};
