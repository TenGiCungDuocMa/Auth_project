import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import {contractABI, simpleStorageContractABI} from './abi';

@Injectable()
export class InteractContractService {
  private readonly provider: ethers.JsonRpcProvider;
  private readonly signer: ethers.Wallet;
  private readonly contract: ethers.Contract;
  constructor() {
    const rpcUrl = process.env.RPC_URL;
    const privateKey = process.env.PRIVATE_KEY;
    const contractAddress = process.env.CONTRACT_ADDRESS;

    if (!rpcUrl || !privateKey || !contractAddress) {
      throw new Error('RPC_URL, CONTRACT_ADDRESS and PRIVATE_KEY must be set in environment variables');

    }
    this.provider = new ethers.JsonRpcProvider(rpcUrl);
    this.signer = new ethers.Wallet(privateKey, this.provider);
    // this.contract = new ethers.Contract(contractAddress,contractABI, this.signer);
    this.contract = new ethers.Contract(contractAddress,simpleStorageContractABI, this.signer);
  }
  getProvider() {
    return this.provider;
  }

  getSigner() {
    return this.signer;
  }
  async getName(): Promise<string> {
    return this.contract.name();
  }
  async getSymbol(): Promise<string> {
    return this.contract.symbol();
  }

  async getOwner(): Promise<string> {
    return this.contract.owner();
  }

  async getTotalSupply(): Promise<number> {
    return this.contract.totalSupply();
  }

  async getBalance(address: string): Promise<string> {
    return this.contract.balanceOf(address);
  }

  async getNumber() {
    return this.contract.get();
  }

  async setNumber(num: number) {
    try{
        const tx = await this.contract.set(ethers.toBeHex(num));
          // console.log(ethers.toBeHex(num))
          // console.log(tx);
          const result = await this.provider.waitForTransaction(tx.hash);
          // console.log(result);
          if(result?.status === 1 ){
            return "Successfull!!!!!"
          }
    } catch(err){
          throw err;
    }
    
  }
}