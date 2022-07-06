import { Module } from '@nestjs/common';
import { MicroCatController } from './micro-cat.controller';
import { MicroCatService } from './micro-cat.service';

@Module({
  imports: [],
  controllers: [MicroCatController],
  providers: [MicroCatService],
})
export class MicroCatModule {}
