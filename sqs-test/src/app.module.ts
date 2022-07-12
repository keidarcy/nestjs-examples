import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SqsModule } from '@ssut/nestjs-sqs';

@Module({
  imports: [
    SqsModule.registerAsync({
      useFactory: () => {
        const queueUrl = process.env.AWS_SQS_URL;
        const name = 'GOOD_QUEUE';
        const region = process.env.AWS_REGION;
        return {
          consumers: [
            {
              name,
              queueUrl,
              region,
            },
          ],
          producers: [
            {
              name,
              queueUrl,
              region,
            },
          ],
        };
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
