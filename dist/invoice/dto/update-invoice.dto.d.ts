import { CreateInvoiceDto } from './create-invoice.dto';
declare const UpdateInvoiceDto_base: import("@nestjs/mapped-types").MappedType<Partial<Omit<CreateInvoiceDto, "number" | "operation">>>;
export declare class UpdateInvoiceDto extends UpdateInvoiceDto_base {
}
export {};
