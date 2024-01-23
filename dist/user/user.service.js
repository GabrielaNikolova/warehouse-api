"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./entities/user.entity");
const typeorm_2 = require("typeorm");
const crypto_1 = require("crypto");
const jwt_1 = require("@nestjs/jwt");
const util_1 = require("util");
const report_user_dto_1 = require("./dto/report-user.dto");
const class_transformer_1 = require("class-transformer");
const scrypt = (0, util_1.promisify)(crypto_1.scrypt);
let UserService = class UserService {
    constructor(repo, jwtService) {
        this.repo = repo;
        this.jwtService = jwtService;
    }
    async find(email) {
        const user = await this.repo.find({ where: { email } });
        if (!user) {
            throw new common_1.NotFoundException(`User with email: ${email} was not found`);
        }
        return user;
    }
    async registerUser(username, email, password) {
        const salt = (0, crypto_1.randomBytes)(8).toString('hex');
        const hash = (await scrypt(password, salt, 32));
        const result = salt + '.' + hash.toString('hex');
        password = result;
        const user = await this.create({ username, email, password });
        return (0, class_transformer_1.plainToInstance)(report_user_dto_1.UserReportDto, user, {
            excludeExtraneousValues: true,
        });
        return user;
    }
    async loginUser(user) {
        const [existingUser] = await this.find(user.email);
        const [salt, storedHash] = existingUser.password.split('.');
        const hash = (await scrypt(user.password, salt, 32));
        if (storedHash !== hash.toString('hex')) {
            throw new common_1.BadRequestException('Wrong password. Please provide a correct password');
        }
        const payload = {
            sub: existingUser.id,
            username: existingUser.username,
            email: existingUser.email,
            role: existingUser.role,
        };
        const token = { access_token: await this.jwtService.signAsync(payload) };
        return token;
    }
    async create(createUserDto) {
        const user = this.repo.create(createUserDto);
        return await this.repo.save(user);
    }
    async update(id, updateUserDto) {
        const user = await this.repo.findOneBy({ id });
        if (!user) {
            throw new common_1.NotFoundException(`User with id: ${id} not found`);
        }
        Object.assign(user, updateUserDto);
        const updatedUser = this.repo.save(user);
        return (0, class_transformer_1.plainToInstance)(report_user_dto_1.UserReportDto, updatedUser, {
            excludeExtraneousValues: true,
        });
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService])
], UserService);
//# sourceMappingURL=user.service.js.map