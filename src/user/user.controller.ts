import { Controller, Post, Body, UseGuards, Param, Patch, ParseUUIDPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRole } from 'src/enum/user-role.enum';
import { HasRoles } from 'src/util/decorator/has-roles.decorator';
import { RolesGuard } from 'src/util/guard/role.guard';
import { Public } from 'src/util/decorator/is-public.decorator';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Public()
    @Post('/register')
    async register(@Body() body: CreateUserDto) {
        return this.userService.registerUser(body.username, body.email, body.password);
    }

    @Public()
    @Post('/login')
    async loginUser(@Body() user: LoginUserDto) {
        return await this.userService.loginUser(user);
    }

    @UseGuards(RolesGuard)
    @HasRoles(UserRole.OWNER)
    @Patch(':id')
    async update(@Param('id', new ParseUUIDPipe()) id: string, @Body() updateUserDto: UpdateUserDto) {
        return await this.userService.update(id, updateUserDto);
    }
}
