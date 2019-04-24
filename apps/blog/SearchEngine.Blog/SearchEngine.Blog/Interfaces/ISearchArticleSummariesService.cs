﻿using SearchEngine.Blog.Domain;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SearchEngine.Blog.Interfaces
{
    public interface ISearchArticleSummariesService
    {
        Task<IEnumerable<ArticleSummary>> SearchArticleSummariesAsync(string searchTerm);
    }
}