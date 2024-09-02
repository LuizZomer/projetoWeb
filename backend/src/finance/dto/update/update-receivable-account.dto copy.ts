import { PartialType } from '@nestjs/mapped-types';
import { CreatePayableAccountDTO } from '../create/create-payable-account.dto copy';
import { CreateReceivableAccountDTO } from '../create/create-receivable-account.dto copy';

export class UpdateReceivableAccountDto extends PartialType(
  CreateReceivableAccountDTO,
) {}
