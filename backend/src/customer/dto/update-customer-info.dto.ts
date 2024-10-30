import { IsEmail, IsOptional, IsStrongPassword } from 'class-validator';

export class UpdateCustomerInfoDTO {
  @IsEmail()
  @IsOptional()
  email: string;

  @IsStrongPassword({
    minLength: 6,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 0,
    minUppercase: 1,
  })
  @IsOptional()
  password: string;
}
