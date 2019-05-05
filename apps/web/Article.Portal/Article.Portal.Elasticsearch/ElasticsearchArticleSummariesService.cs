using Article.Portal.Business.Services.SearchArticleSummaries;
using Article.Portal.Domain;
using Article.Portal.Elasticsearch.Exceptions;
using Nest;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Article.Portal.Elasticsearch
{
    public class ElasticsearchArticleSummariesService : ISearchArticleSummariesService
    {
        private readonly ElasticClient _client;

        public ElasticsearchArticleSummariesService(Uri nodeUri, string defaultIndex)
        {
            var connectionSettings = new ConnectionSettings(nodeUri);
            connectionSettings.DefaultIndex(defaultIndex);

            _client = new ElasticClient(connectionSettings);
        }

        public async Task<IEnumerable<ArticleSummary>> SearchArticleSummariesAsync(string searchTerm)
        {
            try
            {
                var request = new SearchRequest
                {
                    From = 0,
                    Size = 10,
                    //Query = new MultiMatchQuery
                    //{
                    //    Query = searchTerm,
                    //    Fields = new[] { new Field("Title"), new Field("Description") }
                    //}
                };

                var response = await _client.SearchAsync<ArticleSummary>(request);

                if (!response.IsValid)
                {
                    throw response.OriginalException ?? new ElasticsearchQueryFailedException($"Failed to connect to Elasticsearch server");
                }

                return response.Documents;
            }

            catch (Exception ex)
            {
                throw new ElasticsearchQueryFailedException($"Failed to query to Elasticsearch server", ex);
            }
        }
    }
}
