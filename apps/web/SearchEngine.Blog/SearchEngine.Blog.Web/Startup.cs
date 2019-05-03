using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using SearchEngine.Blog.ElasticSearch;
using SearchEngine.Blog.Interfaces;
using System;

namespace SearchEngine.Blog.Web
{
    public class Startup
    {
        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc().AddNewtonsoftJson();
            services.AddServerSideBlazor();

            //services.AddSingleton<ISearchArticleSummariesService>(p => new StaticSearchArticleSummaryService());
            services.AddSingleton<ISearchArticleSummariesService>(p => new ElasticSearchArticleSummariesService(new Uri("http://localhost:9200"), "article-summaries"));
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseEndpoints(routes =>
            {
                routes.MapRazorPages();
                routes.MapFallbackToPage("_Host");
            });
        }
    }
}
