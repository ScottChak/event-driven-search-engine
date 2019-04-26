import * as amqp from "amqplib";

let endpoint: amqp.Options.Connect = {
  hostname: "localhost",
  port: 5672,
  protocol: "amqp",
  username: "user",
  password: "user"
};
let queueName: string = "articles";
let connection: amqp.Connection = undefined;
let channel: amqp.Channel = undefined;

class ArticleSummary {
  id: string;
  creationUtcDate: Date;
  modificationUtcDate: Date;
  author: string;
  title: string;
  publicationUtcDate: Date;
  description: string;
}

async function ReceiveAsync() {
  try {
    connection = await amqp.connect(endpoint);
    channel = await connection.createChannel();

    await channel.assertQueue(queueName, { durable: false });
    await channel.consume(
      queueName,
      (msg: amqp.Message) => {
        let articleSummary: ArticleSummary = JSON.parse(msg.content.toString());
        console.log(articleSummary);
      },
      {
        noAck: true
      }
    );
  } catch (err) {
    console.log(err);
  }
}

ReceiveAsync();
