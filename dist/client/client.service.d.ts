import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './entities/client.entity';
import { Repository } from 'typeorm';
import { ClientReportDto } from './dto/report-client.dto';
export declare class ClientService {
    private repo;
    constructor(repo: Repository<Client>);
    findAll(): Promise<ClientReportDto[]>;
    findOne(id: string): Promise<Client>;
    create(createClientDto: CreateClientDto): Promise<Client>;
    update(id: string, updateClientDto: UpdateClientDto): Promise<Client>;
    delete(id: string): Promise<string>;
    permDelete(id: string): Promise<string>;
}
