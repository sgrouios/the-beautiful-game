using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using the_beautiful_game_api.Enums;
using the_beautiful_game_api.Models;

namespace the_beautiful_game_api.Services
{
    public class HighlightsService : IHighlightsService
    {
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly string scoreBatUrl = "https://www.scorebat.com/video-api/v3/";

        public HighlightsService(IHttpClientFactory httpClientFactory)
        {
            _httpClientFactory = httpClientFactory;
        }

        public async Task<IActionResult> GetLatestHighlights()
        {
            try
            {
                var httpClient = _httpClientFactory.CreateClient();
                var response = await httpClient.GetAsync(scoreBatUrl);
                response.EnsureSuccessStatusCode();
                var responseBody = await response.Content.ReadAsStringAsync();
                var latestHighlights = JsonConvert.DeserializeObject<LatestHighlights>(responseBody);
                return new OkObjectResult(latestHighlights.Response);

            }
            catch
            {
                return new StatusCodeResult(500);
            }
        }

        public async Task<IActionResult> GetLatestPremierLeagueHighlights()
        {
            try
            {
                var httpClient = _httpClientFactory.CreateClient();
                var response = await httpClient.GetAsync(scoreBatUrl);
                response.EnsureSuccessStatusCode();
                var responseBody = await response.Content.ReadAsStringAsync();
                var serializedBody = JsonConvert.DeserializeObject<LatestHighlights>(responseBody);
                var premierLeagueHighlights = serializedBody.Response.Where(x => x.Competition.Equals(FootballCompetitions.EnglishPremierLeague));
                
                return new OkObjectResult(premierLeagueHighlights);

            }
            catch
            {
                return new StatusCodeResult(500);
            }
        }
    }

}
