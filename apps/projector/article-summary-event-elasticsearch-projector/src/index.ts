import { ArticleSummary } from "./domain";
import { IQueueConsumer } from "./queuing";
import { RabbitMQQueueMessageHandler, RabbitMQQueueConsumer } from "./rabbitmq";

let hostname: string = "localhost";
let port: number = 5672;
let protocol: string = "amqp";
let username: string = "user";
let password: string = "user";
let queueName: string = "article-summaries";

async function RunAsync(): Promise<void> {
  try {
    let messageHandler: RabbitMQQueueMessageHandler<ArticleSummary> = new RabbitMQQueueMessageHandler(
      async (content: ArticleSummary) => {
        console.log(content);
      }
    );
    
    let consumer: IQueueConsumer = new RabbitMQQueueConsumer(
      hostname,
      port,
      protocol,
      username,
      password,
      queueName,
      messageHandler
    );
    await consumer.AttachAsync();
  } catch (err) {
    console.log(err);
  }
}

RunAsync();
