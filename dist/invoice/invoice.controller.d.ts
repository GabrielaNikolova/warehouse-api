import { InvoiceService } from './invoice.service';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
export declare class InvoiceController {
    private readonly invoiceService;
    constructor(invoiceService: InvoiceService);
    findAll(): Promise<import("./dto/report-invoice.dto").InvoiceReportDto[]>;
    findOne(id: string): Promise<import("./entities/invoice.entity").Invoice>;
    update(id: string, updateInvoiceDto: UpdateInvoiceDto): Promise<import("./entities/invoice.entity").Invoice>;
    delete(id: string): Promise<string>;
    permDelete(id: string): Promise<string>;
}
