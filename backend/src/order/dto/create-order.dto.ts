import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateMenuDto } from 'src/menu/dto/create-menu.dto';
import { Type } from 'class-transformer';
import { OrderItemDto } from './create-order-items.dto';

interface IMenu extends CreateMenuDto {
  id: string;
}

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
