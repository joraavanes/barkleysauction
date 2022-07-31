import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class SignInUserDto {
    @IsEmail({
        message: 'Please enter your email'
    })
    Email: string;

    @IsString()
    @IsNotEmpty({
        message: 'Please enter your password'
    })
    Password: string;
}