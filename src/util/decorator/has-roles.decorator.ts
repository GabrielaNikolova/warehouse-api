import { SetMetadata } from '@nestjs/common';
import { UserRole } from 'src/enum/user-role.enum';

export const HasRoles = (...roles: UserRole[]) => SetMetadata('roles', roles);
