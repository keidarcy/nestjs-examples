import { Injectable } from '@nestjs/common';

@Injectable()
export class CatService {
  constructor() {
    console.log('init CatService');
  }

  run() {
    return 'nyan';
  }
}
