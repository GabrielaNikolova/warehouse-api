import { Test, TestingModule } from '@nestjs/testing';
import { OperationDetailsService } from './operation-details.service';

describe('OperationDetailsService', () => {
    let service: OperationDetailsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [OperationDetailsService],
        }).compile();

        service = module.get<OperationDetailsService>(OperationDetailsService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
