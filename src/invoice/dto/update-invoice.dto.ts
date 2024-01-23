import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateInvoiceDto } from './create-invoice.dto';

export class UpdateInvoiceDto extends PartialType(OmitType(CreateInvoiceDto, ['operation', 'number'] as const)) {}
