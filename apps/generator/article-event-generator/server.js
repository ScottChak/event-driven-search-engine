let uuid = require("uuid/v1");
let moment = require("moment");

let amqp = require("amqplib");

let endpoint = {
  hostname: "localhost",
  port: 5672,
  protocol: "amqp",
  username: "user",
  password: "user"
};
let queueName = "article-summaries";
let connection = undefined;
let channel = undefined;

async function SendAsync(articleSummary) {
  try {
    connection = await amqp.connect(endpoint);
    channel = await connection.createChannel();

    await channel.assertQueue(queueName, { durable: false });
    channel.sendToQueue(queueName, Buffer.from(JSON.stringify(articleSummary)));
  } catch (err) {
    console.log(err);
  } finally {
    if (channel) {
      await channel.close();
    }

    if (connection) {
      await connection.close();
    }
  }
}

SendAsync({
  id: uuid(),
  creationUtcDate: moment.utc(),
  modificationUtcDate: moment.utc(),
  author: "Fake Author",
  title: "Fake Article",
  publicationUtcDate: moment.utc(),
  description: "Does not actually exist"
});
