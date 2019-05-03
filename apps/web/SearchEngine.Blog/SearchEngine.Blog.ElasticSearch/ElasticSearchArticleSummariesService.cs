using Nest;
using SearchEngine.Blog.Domain;
using SearchEngine.Blog.Interfaces;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SearchEngine.Blog.ElasticSearch
{
    public class ElasticSearchArticleSummariesService : ISearchArticleSummariesService
    {
        private readonly ElasticClient _client;

        public ElasticSearchArticleSummariesService(Uri nodeUri, string defaultIndex)
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
                Query = new MultiMatchQuery
                {
                    Query = searchTerm,
                    Fields = new[] { new Field("Title"), new Field("Description") }
                }
            };

            var response = await _client.SearchAsync<ArticleSummary>(request);

            return response.Documents;
        }
    }
}