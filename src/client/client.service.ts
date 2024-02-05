import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './entities/client.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ClientService {
    constructor(@InjectRepository(Client) private repo: Repository<Client>) {}

    async findAll() {
        const clients = await this.repo.find();
        if (!clients) {
            throw new NotFoundException('There are no clients records in the database');
        }

        return clients;
    }

    async findOne(id: string) {
        const client = await this.repo.findOneBy({ id });
        if (!client) {
            throw new NotFoundException(`Client with id: ${id} was not found`);
        }
        return client;
    }

    async create(createClientDto: CreateClientDto) {
        const client = this.repo.create(createClientDto);
        return await this.repo.save(client);
    }

    async update(id: string, updateClientDto: UpdateClientDto) {
        const client = await this.findOne(id);
        Object.assign(client, updateClientDto);
        return this.repo.save(client);
    }

    async delete(id: string) {
        const client = await this.findOne(id);
        return await this.repo.softRemove(client);
    }

    async permDelete(id: string) {
        const client = await this.findOne(id);
        return this.repo.remove(client);
    }
}
