import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class CreateRevenueAccountDTO {
  @IsString()
  date: string;

  @IsString()
  description: string;

  @IsNumber()
  value: number;

  @IsBoolean()
  status: boolean;

  @IsString()
  customerId: string;

  @IsString()
  orderId: string;
}
