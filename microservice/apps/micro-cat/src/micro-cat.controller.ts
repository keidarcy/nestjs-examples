import { Controller, Get, Body, Logger } from '@nestjs/common';
import { MicroCatService } from './micro-cat.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class MicroCatController {
  private logger = new Logger('MicroCatController');
  constructor(private readonly microCatService: MicroCatService) {}

  @Get()
  getHello(): string {
    return this.microCatService.getHello();
  }

  // No microservice.
  // @Post('add')
  // async accumulate(@Body('data') data: number[]): Promise<number> {
  //   this.logger.log('Adding :' + data.toString());
  //   return this.microCatService.accumulate(data);
  // }

  // with microservice.
  @MessagePattern('add')
  async accumulate(@Body() body): Promise<number> {
    this.logger.log(body);
    this.logger.log('Adding :' + body.toString());
    return this.microCatService.accumulate(body);
  }
}
