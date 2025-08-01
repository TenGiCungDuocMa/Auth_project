import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Message, MessageSchema } from '../../schema/message.schema';


@Module({
  imports:[
    MongooseModule.forFeature(
      [
        {name:Message.name, schema:MessageSchema}
      ],
    )
  ],
  providers:[ChatGateway,ChatService]
})

export class ChatModule {}