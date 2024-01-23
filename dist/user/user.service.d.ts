import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login-user.dto';
import { UserReportDto } from './dto/report-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UserService {
    private repo;
    private jwtService;
    constructor(repo: Repository<User>, jwtService: JwtService);
    find(email: string): Promise<User[]>;
    registerUser(username: string, email: string, password: string): Promise<User | UserReportDto>;
    loginUser(user: LoginUserDto): Promise<{
        access_token: string;
    }>;
    create(createUserDto: CreateUserDto): Promise<User>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<UserReportDto>;
}
