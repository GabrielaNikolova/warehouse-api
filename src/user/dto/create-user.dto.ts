import { IsNotEmpty, IsString, MinLength, MaxLength, IsEmail } from 'class-validator';
import { isUnique } from 'src/util/decorator/is-unique.decorator';

export class CreateUserDto {
    @IsNotEmpty()
    @IsString({ message: 'Username must be a string' })
    @MinLength(5, {
        message: 'Username is too short',
    })
    @MaxLength(20, {
        message: 'Username is too long',
    })
    @isUnique({ tableName: 'user', column: 'username' })
    username: string;

    @IsNotEmpty()
    @isUnique({ tableName: 'user', column: 'email' })
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
