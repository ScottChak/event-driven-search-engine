using Article.Portal.Business.Services.SearchArticleSummaries;
using Article.Portal.Domain;
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
            return response.Documents;
        }
    }
}
