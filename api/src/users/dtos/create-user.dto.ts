import { IsEmail, isNotEmpty, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateUserDto {
    @IsEmail({}, { message: 'Email is not valid' })
    @IsNotEmpty({ message: "Email is required" })
    @MaxLength(256, { message: "The Email is at most 256 length of characters" })
    email: string;

    @IsNotEmpty({ message: 'Password is required' })
    @IsString({ message: 'Password must be of type string' })
    @MaxLength(50, { message: "The password is at most 50 length of characters" })
    password: string;

    @IsNotEmpty({ message: 'Name is required' })
    @IsString({ message: 'Name must be of type string' })
    @MaxLength(50, { message: "The name is at most 50 length of characters" })
    name: string;
    
    @IsNotEmpty({ message: 'Surname is required' })
    @IsString({ message: 'Surname must be of type string' })
    @MaxLength(50, { message: "The surname is at most 50 length of characters" })
    surname: string;
}