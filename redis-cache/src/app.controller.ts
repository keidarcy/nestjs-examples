import { CACHE_MANAGER, Controller, Get, Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @Get()
  async getHello(): Promise<string> {
    const key = 'my-key';

    const cachedData = await this.cacheManager.get(key);

    if (cachedData) {
      console.log(`Getting data from cache!`);
      return `${cachedData}`;
    }

    const data = this.appService.getHello();
    await this.cacheManager.set(key, data);
    return data;
  }
}
