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
exports.ClientService = void 0;
const common_1 = require("@nestjs/common");
const client_entity_1 = require("./entities/client.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let ClientService = class ClientService {
    constructor(repo) {
        this.repo = repo;
    }
    async findAll() {
        const clients = await this.repo.find();
        if (!clients) {
            throw new common_1.NotFoundException('There are no clients records in the database');
        }
        return clients;
    }
    async findOne(id) {
        const client = await this.repo.findOneBy({ id });
        if (!client) {
            throw new common_1.NotFoundException(`Client with id: ${id} was not found`);
        }
        return client;
    }
    async create(createClientDto) {
        const client = this.repo.create(createClientDto);
        return await this.repo.save(client);
    }
    async update(id, updateClientDto) {
        const client = await this.findOne(id);
        Object.assign(client, updateClientDto);
        return this.repo.save(client);
    }
    async delete(id) {
        const client = await this.findOne(id);
        return await this.repo.softRemove(client);
    }
    async permDelete(id) {
        const client = await this.findOne(id);
        return this.repo.remove(client);
    }
};
exports.ClientService = ClientService;
exports.ClientService = ClientService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(client_entity_1.Client)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ClientService);
//# sourceMappingURL=client.service.js.map