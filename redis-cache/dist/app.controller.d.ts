import { Cache } from 'cache-manager';
import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    private cacheManager;
    constructor(appService: AppService, cacheManager: Cache);
    getHello(): Promise<string>;
}
