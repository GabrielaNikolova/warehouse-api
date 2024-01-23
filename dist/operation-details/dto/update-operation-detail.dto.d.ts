import { CreateOperationDetailDto } from './create-operation-detail.dto';
declare const UpdateOperationDetailDto_base: import("@nestjs/mapped-types").MappedType<Partial<Omit<CreateOperationDetailDto, "operation" | "product" | "productQuantity">>>;
export declare class UpdateOperationDetailDto extends UpdateOperationDetailDto_base {
}
export {};
