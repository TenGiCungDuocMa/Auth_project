import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';


export type MessageDocument = HydratedDocument<Message>

@Schema({timestamps:true})
export class Message{
  @Prop()
  username:string;
  @Prop()
  text:string;

  @Prop()
  createdAt: Date;
}
export const MessageSchema = SchemaFactory.createForClass(Message);