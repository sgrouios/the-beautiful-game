using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using the_beautiful_game_api.Configuration;
using the_beautiful_game_api.Services.Interfaces;

namespace the_beautiful_game_api.Services
{
    public static class ServiceRegistration
    {
        public static IServiceCollection AddServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddHttpClient();
            services.AddHttpClient<IFPLService, FPLService>(options => 
            {
                options.BaseAddress = new Uri(configuration.GetValue<string>($"{FPLOptions.FPLParentKey}:Url"));
            });
            services.AddScoped<IHighlightsService, HighlightsService>();
            services.AddScoped<IPlayerStatsService, PlayerStatsService>();
            return services;
        }
    }
}
