import { IsNumber, IsString } from "class-validator";

export class CreateMenuDto {

    @IsString()
    name: string

    @IsString()
    description: string

    @IsNumber()
    value: number;

    @IsString()
    type: string;

    @IsString()
    size: string
}
