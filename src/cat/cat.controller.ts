import { Controller, Get } from '@nestjs/common';
import { LazyModuleLoader } from '@nestjs/core';
import { CatService } from './cat.service';

@Controller('cat')
export class CatController {
  private catService: CatService;
  constructor(private lazyModuleLoader: LazyModuleLoader) {}

  @Get()
  async index() {
    await this.lazyInit();
    return this.catService.run();
  }

  async lazyInit() {
    if (this.catService) return;

    const { CatLazyModule } = await import('./cat.lazy.module');
    const moduleRef = await this.lazyModuleLoader.load(() => CatLazyModule);

    const { CatService } = await import('./cat.service');
    this.catService = moduleRef.get(CatService);
  }
}
