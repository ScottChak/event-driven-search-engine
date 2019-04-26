let uuid = require("uuid/v1");
let amqp = require("amqplib");

let endpoint = {
  hostname: "localhost",
  port: 5672,
  protocol: "amqp",
  username: "user",
  password: "user"
};
let queueName = "articles";
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
  creationUtcDate: Date.now(),
  modificationUtcDate: Date.now(),
  author: "Fake Author",
  title: "Fake Article",
  publicationUtcDate: Date.now(),
  description: "Does not actually exist"
});
