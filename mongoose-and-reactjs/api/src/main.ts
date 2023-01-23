import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const FRONTEND_ORIGIN = 'http://localhost:3000';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: FRONTEND_ORIGIN });
  await app.listen(3001);
  console.log('listening 3001');
}
bootstrap();
