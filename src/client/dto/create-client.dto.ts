import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { isUnique } from 'src/util/decorator/is-unique.decorator';

export class CreateClientDto {
    @IsNotEmpty()
    @IsString({ message: 'Name must be a string' })
    @MinLength(5, {
        message: 'Name is too short',
    })
    @MaxLength(100, {
        message: 'Name is too long',
    })
    @isUnique({ tableName: 'client', column: 'name' })
    name: string;

    @IsString({ message: 'Address must be a string' })
    @MaxLength(350, {
        message: 'Address is too long',
    })
    address: string;

    @IsNotEmpty()
    @IsString({ message: 'Accountable person name  must be a string' })
    @MinLength(5, {
        message: 'Accountable person name  is too short',
    })
    @MaxLength(100, {
        message: 'Accountable person name  is too long',
    })
    accountablePerson: string;

    @IsNotEmpty()
    @IsString({ message: 'UIC must be a string' })
    @MinLength(5, {
        message: 'UIC is too short',
    })
    @MaxLength(20, {
        message: 'UIC is too long',
    })
    @isUnique({ tableName: 'client', column: 'uic' })
    uic: string;
}
