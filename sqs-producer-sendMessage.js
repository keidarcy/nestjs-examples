const { Producer } = require('sqs-producer');

// create simple producer
const producer = Producer.create({
  queueUrl: process.env.AWS_SQS_URL,
  region: process.env.AWS_REGION,
});

async function normalQueue() {
 const result1 = await producer.send(['msg1', 'msg2']);

  const result2 = await producer.send([
    {
      id: 'id1',
      body: 'Hello world',
    },
  ]);

  const result3 = await producer.send([
    {
      id: 'id1',
      body: 'Hello world with two string attributes: attr1 and attr2',
      messageAttributes: {
        attr1: { DataType: 'String', StringValue: 'stringValue' },
        attr2: { DataType: 'Binary', BinaryValue: new Buffer('binaryValue') },
      },
    },
    {
      id: 'id2',
      body: 'Hello world delayed by 5 seconds',
      delaySeconds: 5,
    },
  ]);

    console.log({
        result1,
        result2,
        result3
    })
}

// normalQueue();

async function fifoQueue() {
 // const result1 = await producer.send(['msg1', 'msg2']);

  const result2 = await producer.send([
    {
    id: 'good-id',
      body: 'Hello world',
      groupId: 'group1234',
  //deduplicationId: 'abcdef123456'
    },
  ]);

  // const result3 = await producer.send([
  //   {
  //     id: 'id1',
  //     body: 'Hello world with two string attributes: attr1 and attr2',
  //     messageAttributes: {
  //       attr1: { DataType: 'String', StringValue: 'stringValue' },
  //       attr2: { DataType: 'Binary', BinaryValue: new Buffer('binaryValue') },
  //     },
  //                   groupId: 'group1234',
  // deduplicationId: 'abcdef123456'

  //   },
  //   {
  //     id: 'id2',
  //     body: 'Hello world delayed by 5 seconds',
  //     // delaySeconds: 5,
  //                   groupId: 'group1234',
  // deduplicationId: 'abcdef123456'
  //   },
  // ]);

    console.log({
        // result1,
        result2,
        // result3
    })
}
fifoQueue()
