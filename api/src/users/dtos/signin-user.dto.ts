import { IsEmail, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class SignInUserDto {
    @IsEmail({}, { message: 'The email address is not valid' })
    @IsNotEmpty({message: 'Please enter your email address'})
    email: string;

    @IsNotEmpty({ message: 'Please enter your password' })
    @IsString({ message: 'Password must be of type string' })
    @MaxLength(50, { message: "The password is at most 50 length of characters" })
    password: string;
}