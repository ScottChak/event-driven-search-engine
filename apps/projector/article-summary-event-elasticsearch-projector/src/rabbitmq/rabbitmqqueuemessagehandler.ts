import * as amqp from "amqplib";

import { IQueueMessageHandler } from "../queuing";

export class RabbitMQQueueMessageHandler<TContent> implements IQueueMessageHandler<amqp.Message> {
  private _handleContentAsync: (content: TContent) => Promise<void>;

  public constructor(handleContentAsync: (content: TContent) => Promise<void>) {
    this._handleContentAsync = handleContentAsync;
  }

  public async HandleAsync(message: amqp.Message): Promise<void> {
    let stringContent: string = message.content.toString();
    let content: TContent = JSON.parse(stringContent);
    await this._handleContentAsync(content);
  }
}
