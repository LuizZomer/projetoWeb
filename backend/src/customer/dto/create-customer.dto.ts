import {
  IsBoolean,
  IsInt,
  IsString,
  IsStrongPassword,
  Length,
} from 'class-validator';

export class CreateCustomerDto {
  @IsString()
  fullName: string;

  @IsStrongPassword({
    minLength: 6,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 0,
    minUppercase: 1,
  })
  password: string;

  @IsString()
  @Length(11)
  idnr: string;

  @IsBoolean()
  status: boolean;

  @IsInt()
  loyalty_points: number;
}
