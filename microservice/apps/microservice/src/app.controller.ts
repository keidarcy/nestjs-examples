import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import {
  ClientOptions,
  ClientProxyFactory,
  Transport,
  ClientProxy,
} from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

@Controller()
export class AppController {
  private client: ClientProxy;
  private logger: Logger;
  constructor(private readonly appService: AppService) {
    const microserviceOptions: ClientOptions = {
      transport: Transport.TCP,
      options: {
        host: '127.0.0.1',
        port: 8877,
      },
    };
    this.client = ClientProxyFactory.create(microserviceOptions);
    this.logger = new Logger('AppController');
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('add')
  accumulate(@Body() body): number {
    this.logger.log(body);
    const result = this.client.send<number, number[]>('add', body.data) as any;
    return result;
  }
}
