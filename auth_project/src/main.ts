import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { RedisIoAdapter } from './websocket/adapters/redis-io.adapter';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import * as process from 'process';
import { join } from 'path';
// import { randomBytes } from 'crypto';
// import * as fs from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(new LoggerMiddleware().use);

  const config = new DocumentBuilder()
    .setTitle('Authentication')
    .setDescription('The API description')
    .setVersion('1.0')
    .addTag('Auth')
    .addBearerAuth({
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Enter JWT token here',
      },
      'access-token',)
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  const redisIoAdapter = new RedisIoAdapter(app);
  await redisIoAdapter.connectToRedis();
  app.useWebSocketAdapter(redisIoAdapter);
  app.enableCors({
    origin: 'http://localhost:63342'??'http://192.168.1.190:63342',
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
