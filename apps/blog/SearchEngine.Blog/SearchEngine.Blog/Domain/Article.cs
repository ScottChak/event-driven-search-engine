using System;

namespace SearchEngine.Blog.Domain
{
    public class Article
    {
        public Guid Id { get; set; }

        public DateTime CreationUtcDate { get; set; }

        public DateTime ModificationUtcDate { get; set; }

        public string Author { get; set; }

        public string Title { get; set; }

        public DateTime? PublicationUtcDate { get; set; }

        public string Description { get; set; }
    }
}
