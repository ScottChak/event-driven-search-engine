export interface IQueueMessageHandler<TMessage> {
  HandleAsync(message: TMessage): Promise<void>;
}
