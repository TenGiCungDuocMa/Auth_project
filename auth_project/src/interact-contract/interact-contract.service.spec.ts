import { Test, TestingModule } from '@nestjs/testing';
import { InteractContractService } from './interact-contract.service';

describe('InteractContractService', () => {
  let service: InteractContractService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InteractContractService],
    }).compile();

    service = module.get<InteractContractService>(InteractContractService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
