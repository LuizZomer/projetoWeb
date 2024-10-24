import {
  IsEmail,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class customerRegisterDTO {
  @IsString()
  fullName: string;

  @IsEmail()
  email: string;

  @IsString()
  idnr: string;

  @IsStrongPassword({
    minLength: 6,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 0,
    minUppercase: 1,
  })
  password: string;
}
