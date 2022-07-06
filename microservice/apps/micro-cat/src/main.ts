import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { MicroCatModule } from './micro-cat.module';

// async function bootstrap() {
//   const app = await NestFactory.create(MicroCatModule);
//   await app.listen(3000);
// }
// bootstrap();

const logger = new Logger('Main');

const microserviceOptions = {
  transport: Transport.TCP,
  options: {
    host: '127.0.0.1',
    port: 9001,
    retryAttempts: 5,
    retryDelay: 3000,
  },
};

async function bootstrap() {
  const app = await NestFactory.createMicroservice(
    MicroCatModule,
    microserviceOptions,
  );
  await app.listen();
  logger.log('Microservice is listening...');
}
bootstrap();
