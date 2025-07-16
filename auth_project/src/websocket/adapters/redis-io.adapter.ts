import { IoAdapter } from '@nestjs/platform-socket.io';
import { createAdapter } from '@socket.io/redis-adapter';
import { createClient } from 'redis';
import { ServerOptions } from 'socket.io';

export class RedisIoAdapter extends IoAdapter{
  private adapterContructor:ReturnType<typeof createAdapter>;

  async connectToRedis():Promise<void>{
    const pubClient = createClient({url:`redis://localhost:6379`});
    const subclient = pubClient.duplicate();

    await Promise.all([pubClient.connect(),subclient.connect()]);

    this.adapterContructor = createAdapter(pubClient,subclient);
  }

  createIOServer(port: number, options?: ServerOptions): any {
    const server = super.createIOServer(port,options);
    server.adapter(this.adapterContructor);
    return server;
  }
}