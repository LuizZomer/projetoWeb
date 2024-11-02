import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

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
