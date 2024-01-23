import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './entities/client.entity';
import { Repository } from 'typeorm';
export declare class ClientService {
    private repo;
    constructor(repo: Repository<Client>);
    findAll(): Promise<Client[]>;
    findOne(id: string): Promise<Client>;
    create(createClientDto: CreateClientDto): Promise<Client>;
    update(id: string, updateClientDto: UpdateClientDto): Promise<Client>;
    delete(id: string): Promise<string>;
    permDelete(id: string): Promise<string>;
}
