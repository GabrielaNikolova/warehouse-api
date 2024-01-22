import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    register(body: CreateUserDto): Promise<import("./entities/user.entity").User | import("./dto/report-user.dto").UserReportDto>;
    loginUser(user: LoginUserDto): Promise<{
        access_token: string;
    }>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<import("./dto/report-user.dto").UserReportDto>;
}
