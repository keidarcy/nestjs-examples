import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    console.log('called appService#getHello');
    return 'Hello World!';
  }
}
