import * as amqp from "amqplib";

import { BaseQueueConsumer } from "../queuing";

import { RabbitMQQueueMessageHandler } from "./rabbitmqqueuemessagehandler";

export class RabbitMQQueueConsumer<TContent> extends BaseQueueConsumer<amqp.Message, RabbitMQQueueMessageHandler<TContent>> {
  private _endpoint: amqp.Options.Connect;
  private _queueName: string;

  public constructor(
    hostname: string,
    port: number,
    protocol: string,
    username: string,
    password: string,
    queueName: string,
    messageHandler: RabbitMQQueueMessageHandler<TContent>
  ) {
    super(messageHandler);

    this._endpoint = {
      hostname: hostname,
      port: port,
      protocol: protocol,
      username: username,
      password: password
    };

    this._queueName = queueName;
  }

  public async AttachAsync(): Promise<void> {
    let connection: amqp.Connection = await amqp.connect(this._endpoint);
    let channel: amqp.Channel = await connection.createChannel();

    await channel.assertQueue(this._queueName, { durable: false });
    await channel.consume(
      this._queueName,
      async (message: amqp.Message) => {
        await this._messageHandler.HandleAsync(message);
      },
      {
        noAck: true
      }
    );
  }
}
