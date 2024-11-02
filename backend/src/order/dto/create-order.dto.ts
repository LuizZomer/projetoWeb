import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { OrderItemDto } from './create-order-items.dto';

export class CreateOrderDTO {
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  @IsArray()
  OrderItems: OrderItemDto[];

  @IsString()
  @IsOptional()
  customerId?: string;

  @IsString()
  @IsOptional()
  customerName?: string;
}
