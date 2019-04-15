using SearchEngine.Blog.Domain;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SearchEngine.Blog.Interfaces
{
    public interface ISearchArticles
    {
        Task<IEnumerable<Article>> GetArticlesAsync();
    }
}
