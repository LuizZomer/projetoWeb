import { IsNumber, IsString } from 'class-validator';

export class CreateRevenueAccountDTO {
  @IsString()
  date: string;

  @IsString()
  description: string;

  @IsNumber()
  value: number;
  
  @IsString()
  customerId: string;

  @IsString()
  orderId: string;
}
