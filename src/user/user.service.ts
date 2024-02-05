import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { JwtService } from '@nestjs/jwt';
import { promisify } from 'util';
import { LoginUserDto } from './dto/login-user.dto';
import { UserReportDto } from './dto/report-user.dto';
import { plainToInstance } from 'class-transformer';
import { UpdateUserDto } from './dto/update-user.dto';
const scrypt = promisify(_scrypt);

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private repo: Repository<User>,
        private jwtService: JwtService,
    ) {}

    async find(email: string) {
        const user = await this.repo.find({ where: { email } });
        if (!user) {
            throw new NotFoundException(`User with email: ${email} was not found`);
        }

        return user;
    }

    async registerUser(username: string, email: string, password: string) {
        const salt = randomBytes(8).toString('hex');

        const hash = (await scrypt(password, salt, 32)) as Buffer;

        const result = salt + '.' + hash.toString('hex');
        password = result;

        const user = await this.create({ username, email, password });
        return plainToInstance(UserReportDto, user, {
            excludeExtraneousValues: true,
        });

        return user;
    }

    async loginUser(user: LoginUserDto) {
        const [existingUser] = await this.find(user.email);

        if (!existingUser) {
            throw new NotFoundException(`Email was not found`);
        }

        const [salt, storedHash] = existingUser.password.split('.');

        const hash = (await scrypt(user.password, salt, 32)) as Buffer;

        if (storedHash !== hash.toString('hex')) {
            throw new BadRequestException('Wrong password. Please provide a correct password');
        }

        const payload = {
            id: existingUser.id,
            username: existingUser.username,
            email: existingUser.email,
            role: existingUser.role,
        };

        // const token = { access_token: await this.jwtService.signAsync(payload), user: payload };
        const token = { access_token: await this.jwtService.signAsync(payload) };

        return token;
    }

    async create(createUserDto: CreateUserDto) {
        const user = this.repo.create(createUserDto);
        return await this.repo.save(user);
    }

    async update(id: string, updateUserDto: UpdateUserDto) {
        const user = await this.repo.findOneBy({ id });
        if (!user) {
            throw new NotFoundException(`User with id: ${id} not found`);
        }
        Object.assign(user, updateUserDto);
        const updatedUser = this.repo.save(user);

        return plainToInstance(UserReportDto, updatedUser, {
            excludeExtraneousValues: true,
        });
    }
}
