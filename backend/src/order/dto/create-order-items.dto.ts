import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateMenuDto } from 'src/menu/dto/create-menu.dto';

class ReceivableMenuDto extends CreateMenuDto {
  @IsString()
  id: string;
}

export class OrderItemDto {
  // @ValidateNested({ each: true })
  // @Type(() => ReceivableMenuDto)
  // Menu: ReceivableMenuDto;

  @IsNotEmpty()
  @IsString()
  menuId: string;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}
