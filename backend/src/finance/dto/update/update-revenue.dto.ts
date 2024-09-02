import { IsBoolean } from 'class-validator';

export class UpdateRevenueAccountDTO {
  @IsBoolean()
  status: boolean;
}
