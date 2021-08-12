import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateUseDto {
    
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;
    
    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    password: string;
}