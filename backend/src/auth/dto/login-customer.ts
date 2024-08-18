import { IsEmail, IsString } from 'class-validator';

export class loginCustomerDTO {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
