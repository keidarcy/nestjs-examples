const { Producer } = require('sqs-producer');

// create simple producer
const producer = Producer.create({
  queueUrl: process.env.AWS_SQS_URL,
  region: process.env.AWS_REGION,
});

async function main() {
  await producer.send(['msg1', 'msg2']);

  await producer.send([
    {
      id: 'id1',
      body: 'Hello world',
    },
  ]);

  await producer.send([
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
}

main();
