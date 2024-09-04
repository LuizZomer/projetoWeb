import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateOrderDTO {
    
    @IsString()
    name: string

    @IsNumber()
    value: number;

    @IsString()
    @IsOptional()
    customerId?: string;

    @IsString()
    @IsOptional()
    customerName?: string
}