import { Controller, Get, Body, Logger } from '@nestjs/common';
import { MicroCatService } from './micro-cat.service';
import { GrpcMethod } from '@nestjs/microservices';

interface INumberArray {
  data: number[];
}

interface ISumOfNumberArray {
  sum: number;
}

@Controller()
export class MicroCatController {
  private logger = new Logger('MicroCatController');
  constructor(private readonly microCatService: MicroCatService) {}

  @Get()
  getHello(): string {
    return this.microCatService.getHello();
  }

  // with microservice tcp.
  // @MessagePattern('add')
  // async accumulate(@Body() body): Promise<number> {
  //   this.logger.log(body);
  //   this.logger.log('Adding :' + body.toString());
  //   return this.microCatService.accumulate(body);
  // }

  @GrpcMethod('MicroCatController', 'accumulate')
  accumulate(numberArray: INumberArray, metadata: any): ISumOfNumberArray {
    this.logger.log('Adding :' + numberArray.data.toString());
    return { sum: this.microCatService.accumulate(numberArray.data) };
  }
}
