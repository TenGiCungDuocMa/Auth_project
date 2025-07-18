import { Controller, Param, Get, Post, Body,Patch, Put } from '@nestjs/common';
import { InteractContractService } from './interact-contract.service';
import { Public } from 'src/metadata';

@Controller('interact-contract')
export class InteractContractController {
  constructor(private readonly interactContractService: InteractContractService) {}

  // @Public()
  // @Get('get-balance/{:address}')
  // getBalance(@Param("address") address: string){
  //   console.log(address)
  //   return this.interactContractService.getBalance(address);
  // }

  @Public()
  @Get('GetNum')
  getNumber(){
    return this.interactContractService.getNumber();
  }

  @Public()
  @Post('SetNum/{:num}')
  setNumber(@Param("num") num: number) 
  {
      try{
        return this.interactContractService.setNumber(num);
      } catch(err){
        throw err;
      }
  }
}
