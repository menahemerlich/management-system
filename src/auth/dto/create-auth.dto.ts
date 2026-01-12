import { IsString, IsEnum, IsNotEmpty, IsEmail } from "class-validator";


export class CreateAuthDto {
    @IsNotEmpty()
    @IsString()
    id: string;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string
 
    @IsNotEmpty()
    @IsString()
    password: string

    @IsNotEmpty()
    @IsEnum(['Soldier', 'Commander'])
    role: "Soldier" | "Commander"
}
