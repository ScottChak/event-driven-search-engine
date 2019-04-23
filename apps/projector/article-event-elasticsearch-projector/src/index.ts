import * as amqp from "amqplib";

let endpoint: string = "amqp://localhost";
let queueName: string = "articles";
let connection: amqp.Connection = undefined;
let channel: amqp.Channel = undefined;

async function SendAsync() {
  try {
    connection = await amqp.connect(endpoint);
    channel = await connection.createChannel();

    await channel.assertQueue(queueName, { durable: false });
    await channel.consume(
      queueName,
      (msg: amqp.Message) => {
        console.log(`Received ${msg.content.toString()}`);
      },
      {
        noAck: true
      }
    );
  } catch (err) {
    console.log(err);
  }
}

SendAsync();
