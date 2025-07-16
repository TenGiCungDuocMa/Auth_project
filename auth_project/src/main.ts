import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { LoggerMiddleware } from './middleware/logger.middleware';
// import { randomBytes } from 'crypto';
// import * as fs from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(new LoggerMiddleware().use);


    // const secret = randomBytes(32).toString('hex');
    // fs.appendFileSync('.env', `\nJWT_SECRET=${secret}\n`);
    // console.log('Secret written to .env!');

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
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
