export interface IQueueConsumer {
  AttachAsync(): Promise<void>;
}
