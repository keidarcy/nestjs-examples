import { Injectable } from '@nestjs/common';

@Injectable()
export class DogService {
  constructor() {
    console.log('init DogService');
  }

  run() {
    return 'wowoow';
  }
}
