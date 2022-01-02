import {  IsNumber, IsString } from 'class-validator';

export class CreateUserBodyDto {
    @IsString()
    name: string;
  
    @IsString()
    email: string;
  
    @IsNumber()
    age: number;
  
    @IsString()
    phone: string;
}