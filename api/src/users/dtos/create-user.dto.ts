import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDTo {
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty({
        message: 'Surname is required'
    })
    password: string;

    @IsString()
    @IsNotEmpty({
        message: 'Surname is required'
    })
    name: string;

    @IsString({
        message: 'Surname must be a string'
    })
    @IsNotEmpty({
        message: 'Surname is required'
    })
    surname: string;
}