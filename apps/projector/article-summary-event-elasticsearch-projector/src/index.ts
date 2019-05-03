import { ArticleSummary } from "./domain";

import { IQueueConsumer } from "./queuing";
import { RabbitMQQueueMessageHandler, RabbitMQQueueConsumer } from "./rabbitmq";

import { IProjector } from "./projecting";
import { ElasticSearchProjector } from "./elasticsearch";

let rabbitMQHostname: string = "localhost";
let rabbitMQPort: number = 5672;
let rabbitMQProtocol: string = "amqp";
let rabbitMQUsername: string = "user";
let rabbitMQPassword: string = "user";
let rabbitMQQueueName: string = "article-summaries";

let elasticsearchHostname: string = "localhost";
let elasticsearchPort: number = 9200;
let elasticsearchProtocol: string = "http";
let elasticsearchIndexName: string = "article-summaries";

async function RunAsync(): Promise<void> {
  try {
    let projector: IProjector<ArticleSummary> = new ElasticSearchProjector<ArticleSummary>(
      elasticsearchHostname,
      elasticsearchPort,
      elasticsearchProtocol,
      elasticsearchIndexName
    );

    let messageHandler: RabbitMQQueueMessageHandler<ArticleSummary> = new RabbitMQQueueMessageHandler(
      async (content: ArticleSummary) => await projector.ProjectAsync(content)
    );

    let consumer: IQueueConsumer = new RabbitMQQueueConsumer(
      rabbitMQHostname,
      rabbitMQPort,
      rabbitMQProtocol,
      rabbitMQUsername,
      rabbitMQPassword,
      rabbitMQQueueName,
      messageHandler
    );
    await consumer.AttachAsync();
  } catch (err) {
    console.log(err);
  }
}

RunAsync();
