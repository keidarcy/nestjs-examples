import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import {
  ClientOptions,
  Client,
  Transport,
  ClientProxy,
} from '@nestjs/microservices';
import { Logger } from '@nestjs/common';
import { Observable } from 'rxjs';

const microserviceOptions: ClientOptions = {
  transport: Transport.TCP,
  options: {
    host: '127.0.0.1',
    port: 9001,
  },
};

@Controller()
export class AppController {
  @Client(microserviceOptions)
  client: ClientProxy;

  private logger: Logger;
  constructor(private readonly appService: AppService) {
    this.logger = new Logger('AppController');
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('add')
  accumulate(@Body() body): Observable<number> {
    this.logger.log(body);
    const result = this.client.send<number, number[]>('add', body.data);
    return result;
  }
}
