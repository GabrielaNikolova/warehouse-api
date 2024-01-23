import { CreateClientDto } from './create-client.dto';
declare const UpdateClientDto_base: import("@nestjs/mapped-types").MappedType<Partial<Omit<CreateClientDto, "uic">>>;
export declare class UpdateClientDto extends UpdateClientDto_base {
}
export {};
