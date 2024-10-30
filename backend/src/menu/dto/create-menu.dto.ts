import { IsBoolean, IsEnum, IsNumber, IsString } from 'class-validator';
import { EnumSizeMenuItem, EnumTypeMenuItem } from '../enums';

export class CreateMenuDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  value: number;

  @IsEnum(EnumTypeMenuItem)
  type: string;

  @IsEnum(EnumSizeMenuItem)
  size: string;

  @IsBoolean()
  status: boolean;
}
