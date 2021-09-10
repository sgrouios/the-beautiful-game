using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using the_beautiful_game_api.Configuration;
using the_beautiful_game_api.Models;
using the_beautiful_game_api.Services.Interfaces;

namespace the_beautiful_game_api.Services
{
    public class FPLService : IFPLService
    {
        private readonly HttpClient _httpClient;
        private readonly IOptions<FPLOptions> _options;
        private readonly IMapper _mapper;

        public FPLService(HttpClient httpClient,
                          IOptions<FPLOptions> options,
                          IMapper mapper)
        {
            _httpClient = httpClient;
            _options = options;
            _mapper = mapper;
        }

        public async Task<IActionResult> GetPlayerSearchResults(string playerName)
        {
            var response = await _httpClient.GetAsync("bootstrap-static/");
            var responseBody = await response.Content.ReadAsStringAsync();
            var playerResults = JsonConvert.DeserializeObject<FplPlayerSearchResults>(responseBody);
            var findPlayer = playerResults.Elements.FindAll(x => x.Second_Name.ToLower().Contains(playerName.ToLower()));
            foreach(FplPlayerResult player in findPlayer)
            {
                player.ImageUrl = $"{_options.Value.ImageUrl}{player.Code}.png";
            }
            var mapPlayer = _mapper.Map<List<PlayerResult>>(findPlayer);
            return new OkObjectResult(mapPlayer);
        }

        public async Task<IActionResult> GetPlayerProfile(PlayerResult playerDetails)
        {
            var response = await _httpClient.GetAsync($"element-summary/{playerDetails.Id}/");
            var responseBody = await response.Content.ReadAsStringAsync();
            var playerStats = JsonConvert.DeserializeObject<FplPlayerSeason>(responseBody);
            var mappedPlayer = _mapper.Map<PlayerProfile>(playerStats);
            mappedPlayer.PlayerDetails = playerDetails;
            return new OkObjectResult(mappedPlayer);

        }
    }
}
