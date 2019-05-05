using System;

namespace Article.Portal.Elasticsearch.Exceptions
{
    [Serializable]
    public class ElasticsearchQueryFailedException : Exception
    {
        public ElasticsearchQueryFailedException() : base() { }

        public ElasticsearchQueryFailedException(string message) : base(message) { }

        public ElasticsearchQueryFailedException(string message, Exception innerException) : base(message, innerException) { }
    }
}
