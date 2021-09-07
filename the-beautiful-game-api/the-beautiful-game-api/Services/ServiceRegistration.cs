using Microsoft.Extensions.DependencyInjection;

namespace the_beautiful_game_api.Services
{
    public static class ServiceRegistration
    {
        public static IServiceCollection AddServices(this IServiceCollection services)
        {
            services.AddHttpClient();
            services.AddScoped<IHighlightsService, HighlightsService>();
            return services;
        }
    }
}
