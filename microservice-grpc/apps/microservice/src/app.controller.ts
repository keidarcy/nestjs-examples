import { Controller, Post, Body, OnModuleInit } from '@nestjs/common';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';
import { microserviceOptions, IGrpcService } from './grpc';

@Controller()
export class AppController implements OnModuleInit {
  // @Client(microserviceOptions)
  // client: ClientProxy;

  @Client(microserviceOptions) // <-- Add
  private client: ClientGrpc;

  private grpcService: IGrpcService;

  private logger: Logger;
  constructor() {
    this.logger = new Logger('AppController');
  }

  onModuleInit() {
    this.grpcService =
      this.client.getService<IGrpcService>('MicroCatController');
  }

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }

  @Post('add')
  accumulate(@Body('data') data: number[]) {
    this.logger.log(data);
    const result = this.grpcService.accumulate({ data });
    return result;
  }
}
