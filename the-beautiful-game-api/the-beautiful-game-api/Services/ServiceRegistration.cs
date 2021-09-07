using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace the_beautiful_game_api.Services
{
    public static class ServiceRegistration
    {
        public static IServiceCollection AddServices(this IServiceCollection services)
        {
            services.AddHttpClient();
            services.AddScoped<ILatestHighlightsService, LatestHighlightsService>();
            return services;
        }
    }
}
