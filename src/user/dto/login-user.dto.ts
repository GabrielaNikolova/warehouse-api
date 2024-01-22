import { IsNotEmpty, IsString, MinLength, MaxLength, IsEmail } from 'class-validator';

export class LoginUserDto {
    @IsNotEmpty()
    @IsEmail({ message: 'Please provide a valid email' })
    email: string;

    @IsNotEmpty()
    @IsString({ message: 'Password must be a string' })
    @MinLength(5, {
        message: 'Password is too short',
    })
    @MaxLength(20, {
        message: 'Password is too long',
    })
    password: string;
}
