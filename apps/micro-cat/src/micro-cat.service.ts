import { Injectable } from '@nestjs/common';

@Injectable()
export class MicroCatService {
  getHello(): string {
    return 'Hello World!';
  }

  public accumulate(data: number[]): number {
    return (data || []).reduce((acc, curr) => acc + curr, 0);
  }
}
