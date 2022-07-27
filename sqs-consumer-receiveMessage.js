const { Consumer } = require('sqs-consumer');

const queueUrl = process.env.AWS_SQS_URL;

const app = Consumer.create({
  pollingWaitTimeMs: 2000,
  queueUrl,
  handleMessage: async (message) => {
    // do some work with `message`
    console.log('message:', message);
  },
});

app.on('error', (err) => {
  console.error(err.message);
});

app.on('processing_error', (err) => {
  console.error(err.message);
});

app.start();
