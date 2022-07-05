import { NestFactory } from '@nestjs/core';
import { CatModule } from './cat.module';

async function bootstrap() {
  const app = await NestFactory.create(CatModule);
  await app.listen(3000);
}
bootstrap();
