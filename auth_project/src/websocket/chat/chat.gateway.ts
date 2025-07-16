import {
  ConnectedSocket,
  MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { from, map, Observable, Timestamp } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { ChatService } from './chat.service';


@WebSocketGateway({ cors: { origin: '*' }, namespace: 'chat' })
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer()
  server: Server;

  constructor(private jwtService: JwtService, private chatService:ChatService) {
  }

  @SubscribeMessage('events')
  findAll(@MessageBody() data: any): Observable<WsResponse<number>> {
    return from([1, 2, 3]).pipe(map(item => ({ event: 'events', data: item })));
  }

  @SubscribeMessage('identity')
  async identity(@MessageBody() data: number): Promise<number> {
    return data;
  }

  afterInit(server: any): any {
    console.log('WebSocket initialized');
  }

  async handleConnection(client: Socket) {
    const token = client.handshake.auth?.token;
    if (!token) {
      console.log('Missing token, disconnecting...');
      client.disconnect();
      return;
    }
    try {
      const payload = this.jwtService.verify(token, { secret: process.env.JWT_SECRET });
      client.data.user = payload;
      console.log(`User ${payload.username} connected`);
      const messages = await this.chatService.getMessages();
      client.emit('message-history',messages);
    } catch (err) {
      console.log(`Unauthorized WebSocket connection`);
      client.disconnect();
    }

  }

  handleDisconnect(client: Socket): any {
    const payload = client.data.user;
    console.log(`Goodbye ${payload.username}. See you late!`);
  }

  @SubscribeMessage('message')
  async handleMessage(@ConnectedSocket() client: Socket, @MessageBody() text: string) {
    const username = client.data.user?.username;
    const message = await this.chatService.saveMessage(username, text);
    this.server.emit('message', message);
  }
}