import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { Invoice } from './entities/invoice.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class InvoiceService {
    constructor(@InjectRepository(Invoice) private repo: Repository<Invoice>) {}

    async findAll() {
        const invoice = await this.repo.find();
        if (!invoice) {
            throw new NotFoundException(`There are no invoice records in the database`);
        }
        return invoice;
    }

    async findOne(id: string) {
        const invoice = await this.repo.findOneBy({ id });
        if (!invoice) {
            throw new NotFoundException(`Invoice with id: ${id} was not found`);
        }
        return invoice;
    }

    async create(createInvoiceDto: CreateInvoiceDto) {
        const invoice = this.repo.create(createInvoiceDto);
        return await this.repo.save(invoice);
    }

    createDto() {
        const dto = new CreateInvoiceDto();
        const number = generateID();
        dto.number = number;
        dto.date = new Date();
        return dto;
    }

    async update(id: string, updateInvoiceDto: UpdateInvoiceDto) {
        const invoice = await this.findOne(id);
        Object.assign(invoice, updateInvoiceDto);
        return await this.repo.save(invoice);
    }

    async delete(id: string) {
        const invoice = await this.findOne(id);
        await this.repo.createQueryBuilder().softDelete().where({ id: invoice.id }).execute();

        return invoice.id;
    }

    async permDelete(id: string) {
        const invoice = await this.findOne(id);
        this.repo.remove(invoice);

        return invoice.id;
    }
}

function generateID(): string {
    const timestamp = new Date().getFullYear();
    const randomNum = Math.floor(Math.random() * 100);
    return `${timestamp}-${randomNum}`;
}
