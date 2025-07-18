import { Test, TestingModule } from '@nestjs/testing';
import { InteractContractController } from './interact-contract.controller';
import { InteractContractService } from './interact-contract.service';

describe('InteractContractController', () => {
  let controller: InteractContractController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InteractContractController],
      providers: [InteractContractService],
    }).compile();

    controller = module.get<InteractContractController>(InteractContractController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
