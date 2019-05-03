import * as elasticsearch from "@elastic/elasticsearch";

import { IProjector } from "../projecting";

export class ElasticSearchProjector<TContent> implements IProjector<TContent> {
  private _client: elasticsearch.Client;
  private _indexName: string;

  public constructor(hostname: string, port: number, protocol: string, indexName: string) {
    this._client = new elasticsearch.Client({
      node: `${protocol}://${hostname}:${port}`
    });

    this._indexName = indexName;
  }

  public async ProjectAsync(content: TContent): Promise<void> {
    let request: elasticsearch.RequestParams.Index = {
      index: this._indexName,
      type: "_doc",
      id: content["id"],
      body: content
    };

    await this._client.index(request);
  }
}
