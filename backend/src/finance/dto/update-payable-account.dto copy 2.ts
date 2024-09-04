import { PartialType } from '@nestjs/mapped-types';
import { CreateFinanceDTO } from './create-payable-account.dto copy';

export class UpdateFinanceDTO extends PartialType(
  CreateFinanceDTO,
) {}
