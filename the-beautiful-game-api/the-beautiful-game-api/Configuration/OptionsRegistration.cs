using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace the_beautiful_game_api.Configuration
{
    public static class OptionsRegistration
    {
        public static IServiceCollection AddConfigurationOptions(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddOptions<FPLOptions>()
                .Bind(configuration.GetSection(FPLOptions.FPLParentKey))
                .ValidateDataAnnotations();
            
            return services;
        }
    }
}
