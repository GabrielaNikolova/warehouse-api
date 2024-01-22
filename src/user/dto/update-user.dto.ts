import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { UserRole } from 'src/enum/user-role.enum';
import { IsEnum } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsEnum(UserRole)
    role: UserRole;
}
