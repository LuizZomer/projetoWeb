import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class CreateReceivableAccountDTO {
  @IsString()
  dueDate: string;

  @IsString()
  description: string;

  @IsNumber()
  value: number;

  @IsBoolean()
  status: boolean;
}
