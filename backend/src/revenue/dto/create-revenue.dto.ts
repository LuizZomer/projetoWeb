import { IsNumber, IsString } from 'class-validator';

export class CreateRevenueAccountDTO {
  @IsString()
  date: Date;

  @IsString()
  description: string;

  @IsNumber()
  value: number;
  
  @IsString()
  customerId?: string;

  @IsString()
  customerName?: string;

  @IsString()
  orderId: string;
}
