using Article.Portal.Domain;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Article.Portal.Business.Services.SearchArticleSummaries
{
    public interface ISearchArticleSummariesService
    {
        Task<IEnumerable<ArticleSummary>> SearchArticleSummariesAsync(string searchTerm);
    }
}
