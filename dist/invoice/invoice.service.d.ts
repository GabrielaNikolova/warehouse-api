import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { Invoice } from './entities/invoice.entity';
import { Repository } from 'typeorm';
import { InvoiceReportDto } from './dto/report-invoice.dto';
export declare class InvoiceService {
    private repo;
    constructor(repo: Repository<Invoice>);
    findAll(): Promise<InvoiceReportDto[]>;
    findOne(id: string): Promise<Invoice>;
    create(createInvoiceDto: CreateInvoiceDto): Promise<Invoice>;
    createDto(): CreateInvoiceDto;
    update(id: string, updateInvoiceDto: UpdateInvoiceDto): Promise<Invoice>;
    delete(id: string): Promise<string>;
    permDelete(id: string): Promise<string>;
}
