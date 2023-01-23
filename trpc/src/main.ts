import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { TRPCService } from './trpc.service';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const trpcService = app.get(TRPCService);
  trpcService.applyMiddleware(app);
  await app.listen(3000);
}
bootstrap();
