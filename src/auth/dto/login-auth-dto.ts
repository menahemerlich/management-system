import { IsString, IsNotEmpty } from "class-validator";


export class LoginAuthDto {
    
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    password: string

}
