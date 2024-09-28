import { IsNumber, IsString } from 'class-validator';

export class CreateRevenueAccountDTO {
  @IsString()
  date: Date;

  @IsNumber()
  value: number;

  @IsString()
  customerId?: string;

  @IsString()
  customerName?: string;

  @IsString()
  orderId: string;
}
