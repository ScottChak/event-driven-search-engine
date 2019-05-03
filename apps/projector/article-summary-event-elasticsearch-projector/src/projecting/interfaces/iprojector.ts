export interface IProjector<TContent> {
  ProjectAsync(content: TContent): Promise<void>;
}
