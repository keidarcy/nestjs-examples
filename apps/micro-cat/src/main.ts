import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ClientOptions, Transport } from '@nestjs/microservices';
import { MicroCatModule } from './micro-cat.module';
import { join } from 'path';

const logger = new Logger('Main');
const microserviceOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    package: 'app',
    protoPath: join(__dirname, '../../../app.proto'),
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
