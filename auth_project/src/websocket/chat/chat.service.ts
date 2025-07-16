import { Injectable } from '@nestjs/common';
import { Message, MessageDocument } from '../../schema/message.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';


@Injectable()
export class ChatService{
  constructor(@InjectModel(Message.name) private messageModel: Model<MessageDocument>) {
  }

  async saveMessage(username:string, text:string):Promise<Message>{
    const newMessage = new this.messageModel({username,text})
    return newMessage.save();
  }

  async getMessages():Promise<Message[]>{
    return this.messageModel.find().sort({createdAt:1}).exec();
  }
}