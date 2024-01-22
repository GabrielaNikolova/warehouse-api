import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateOperationDetailDto } from './create-operation-detail.dto';

export class UpdateOperationDetailDto extends PartialType(OmitType(CreateOperationDetailDto, ['operation'] as const)) {}
