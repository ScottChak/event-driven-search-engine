using SearchEngine.Blog.Domain;
using SearchEngine.Blog.Interfaces;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SearchEngine.Blog.Web.Services
{
    public class StaticSearchArticles : ISearchArticles
    {
        public StaticSearchArticles()
        {
            var now = DateTime.UtcNow;

            _articles = new[]
            {
                new Article
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

        private readonly IEnumerable<Article> _articles;

        public Task<IEnumerable<Article>> GetArticlesAsync() => Task.FromResult(_articles);
    }
}
