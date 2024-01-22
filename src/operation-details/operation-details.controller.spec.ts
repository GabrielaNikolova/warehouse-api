import { Test, TestingModule } from '@nestjs/testing';
import { OperationDetailsController } from './operation-details.controller';
import { OperationDetailsService } from './operation-details.service';

describe('OperationDetailsController', () => {
    let controller: OperationDetailsController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [OperationDetailsController],
            providers: [OperationDetailsService],
        }).compile();

        controller = module.get<OperationDetailsController>(OperationDetailsController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
