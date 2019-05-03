import { IQueueConsumer } from "../interfaces/iqueueconsumer";
import { IQueueMessageHandler } from "../interfaces/iqueuemessagehandler";

export abstract class BaseQueueConsumer<TMessage, TQueueMessageHandler extends IQueueMessageHandler<TMessage>>
  implements IQueueConsumer {
  protected _messageHandler: TQueueMessageHandler;

  public constructor(messageHandler: TQueueMessageHandler) {
    this._messageHandler = messageHandler;
  }

  public abstract AttachAsync(): Promise<void>;
}
