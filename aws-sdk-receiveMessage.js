// Load the AWS SDK for Node.js
const AWS = require('aws-sdk');
// Set the region
AWS.config.update({ region: 'REGION' });

// Create an SQS service object
const sqs = new AWS.SQS({ apiVersion: '2012-11-05' });

const queueUrl = process.env.AWS_SQS_URL;

const params = {
  AttributeNames: ['SentTimestamp'],
  MaxNumberOfMessages: 10,
  MessageAttributeNames: ['All'],
  QueueUrl: queueURL,
  VisibilityTimeout: 20,
  WaitTimeSeconds: 0,
};

sqs.receiveMessage(params, function (err, data) {
  console.log(data);
  if (err) {
    console.log('Receive Error', err);
  } else if (data.Messages) {
    const deleteParams = {
      QueueUrl: queueUrl,
      ReceiptHandle: data.Messages[0].ReceiptHandle,
    };
    sqs.deleteMessage(deleteParams, function (err, data) {
      if (err) {
        console.log('Delete Error', err);
      } else {
        console.log('Message Deleted', data);
      }
    });
  }
});
