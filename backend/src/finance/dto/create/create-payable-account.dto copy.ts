import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class CreatePayableAccountDTO {
  @IsString()
  dueDate: string;

  @IsString()
  description: string;

  @IsNumber()
  value: number;

  @IsBoolean()
  status: boolean;
}
