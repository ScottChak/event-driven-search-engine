using SearchEngine.Blog.Domain;
using SearchEngine.Blog.Interfaces;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SearchEngine.Blog.Web.Services
{
    public class StaticArticleSummarySearchService : IArticleSummarySearchService
    {
        public StaticArticleSummarySearchService()
        {
            var now = DateTime.UtcNow;

            _articles = new[]
            {
                new ArticleSummary
                {
                    Id = Guid.NewGuid(),
                    CreationUtcDate = now,
                    ModificationUtcDate = now,
                    Author = "Fake Author",
                    Title = "Fake Article",
                    PublicationUtcDate = now,
                    Description = "Does not actually exist"
                }
            };
        }

        private readonly IEnumerable<ArticleSummary> _articles;

        public Task<IEnumerable<ArticleSummary>> SearchArticleSummariesAsync(string searchTerm) => Task.FromResult(_articles);
    }
}
