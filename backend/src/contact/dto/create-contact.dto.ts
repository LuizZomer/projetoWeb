import { IsEnum, IsString } from 'class-validator';
import { ContactType } from 'src/enums/contactType.enum';

export class CreateContactDto {
  @IsEnum(ContactType)
  type: string;

  @IsString()
  value: string;

  @IsString()
  customerId: string;
}
