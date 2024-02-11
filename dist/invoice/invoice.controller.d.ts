import { InvoiceService } from './invoice.service';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
export declare class InvoiceController {
    private readonly invoiceService;
    constructor(invoiceService: InvoiceService);
    findAll(): Promise<import("./entities/invoice.entity").Invoice[]>;
    findByOperation(opId: string): Promise<import("./entities/invoice.entity").Invoice>;
    findOne(id: string): Promise<import("./entities/invoice.entity").Invoice>;
    update(id: string, updateInvoiceDto: UpdateInvoiceDto): Promise<import("./entities/invoice.entity").Invoice>;
    delete(id: string): Promise<import("./entities/invoice.entity").Invoice>;
    permDelete(id: string): Promise<import("./entities/invoice.entity").Invoice>;
}
