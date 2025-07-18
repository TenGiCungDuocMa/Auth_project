import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { ProductModule } from './product/product.module';
import { ApiModule } from './api/api.module';
import { ChatModule } from './websocket/chat/chat.module';
import { JwtModule } from '@nestjs/jwt';
import { ChatGateway } from './websocket/chat/chat.gateway';
import { InteractContractModule } from './interact-contract/interact-contract.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_URI, {
      connectionFactory: (connection) => {
        connection.once('open', () => {
          console.warn('Connected to MongoDB');
        });
        return connection;
      },
    }),
    AuthModule,
    UsersModule,
    ProductModule,
    ApiModule,
    ChatModule,
    JwtModule.register({
      global:true,
      secret:process.env.JWT_SECRET,
      signOptions:{expiresIn:'24h'}
    }),
    InteractContractModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule{
}
