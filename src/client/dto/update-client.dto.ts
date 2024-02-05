import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateClientDto } from './create-client.dto';

export class UpdateClientDto extends PartialType(CreateClientDto) {}
// export class UpdateClientDto extends PartialType(OmitType(CreateClientDto, ['uic'] as const)) {}
