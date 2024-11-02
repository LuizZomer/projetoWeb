import { Type } from 'class-transformer';
import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { TTypeCheck } from 'src/utils/types';

class OrderInfoDTO {
  @IsString()
  type: TTypeCheck;

  @IsNumber()
  quantity: number;
}

export class PayRevenueDTO {
  @IsString()
  @IsOptional()
  customerId: string | null;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderInfoDTO)
  orderInfo: OrderInfoDTO[];
}
