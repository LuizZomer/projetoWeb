import { PartialType } from '@nestjs/mapped-types';
import { CreatePayableAccountDTO } from '../create/create-payable-account.dto copy';

export class UpdatePayableAccountDto extends PartialType(
  CreatePayableAccountDTO,
) {}
