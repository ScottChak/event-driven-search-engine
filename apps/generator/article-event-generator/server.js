let amqp = require("amqplib");

let endpoint = "amqp://localhost";
let queueName = "articles";
let connection = undefined;
let channel = undefined;

async function SendAsync() {
  try {
    connection = await amqp.connect(endpoint);
    channel = await connection.createChannel();

    await channel.assertQueue(queueName, { durable: false });
    channel.sendToQueue(queueName, Buffer.from("Hello World !"));
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

SendAsync();
