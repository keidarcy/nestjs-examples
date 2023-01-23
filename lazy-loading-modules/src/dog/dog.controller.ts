import { Controller, Get } from '@nestjs/common';
import { DogService } from './dog.service';

@Controller('dog')
export class DogController {
  constructor(private dogService: DogService) {}

  @Get()
  index() {
    return this.dogService.run();
  }
}
