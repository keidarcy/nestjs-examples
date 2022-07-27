import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { SqsMessageHandler, SqsService } from '@ssut/nestjs-sqs';

@Injectable()
export class AppService {
  public constructor(private readonly sqsService: SqsService) {}

  getHello(): string {
    return 'Hello World!';
  }

  @SqsMessageHandler(/** name: */ 'GOOD_QUEUE', /** batch: */ false)
  public async handleMessage(message: AWS.SQS.Message) {
    console.log('message', message);
  }

  public async dispatchSomething() {
    await this.sqsService.send(/** name: */ 'GOOD_QUEUE', {
      id: '123',
      body: { name: 'something' },
      // groupId: 'groupId',
      // deduplicationId: 'deduplicationId',
      // messageAttributes: { ... },
      delaySeconds: 0,
    });
  }
  // @SqsConsumerEventHandler(
  //   /** name: */ 'queueName',
  //   /** eventName: */ 'processing_error',
  // )
  // public onProcessingError(error: Error, message: AWS.SQS.Message) {
  //   // report errors here
  // }
}
