
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const oldSend = res.send;

    let responseBody: any;

    res.send = function (body: any): Response {
      responseBody = body;
      return oldSend.call(this, body); // gọi lại hàm gốc
    };

    res.on('finish', () => {
      console.log(` [${req.method}] ${req.originalUrl}`);
      console.log(`Response Status: ${res.statusCode}`);
      console.log(`Response Body:`, responseBody);
    });

    next();
  }
}
