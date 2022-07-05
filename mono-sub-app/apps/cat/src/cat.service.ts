import { Injectable } from '@nestjs/common';

@Injectable()
export class CatService {
  getHello(): string {
    return 'Hello World!';
  }
}
