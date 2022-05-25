import { INestApplicationContext } from '@nestjs/common'
import { IoAdapter } from '@nestjs/platform-socket.io';
import { ServerOptions, Server } from 'socket.io';

export class SocketAdapter extends IoAdapter {
  constructor(
    private app: INestApplicationContext
  ) {
    super(app);
  }

  createIOServer(port: number, options?: ServerOptions): Server {
    return super.createIOServer(port, {
      cors: process.env.CORS_BASE_URL
    })
  }
}
