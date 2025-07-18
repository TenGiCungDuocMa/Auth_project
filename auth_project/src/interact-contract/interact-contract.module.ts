import { Module } from '@nestjs/common';
import { InteractContractService } from './interact-contract.service';
import { InteractContractController } from './interact-contract.controller';

@Module({
  controllers: [InteractContractController],
  providers: [InteractContractService],
})
export class InteractContractModule {}
