using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System;
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
            try
            {
                var response = await _httpClient.GetAsync("bootstrap-static/");
                response.EnsureSuccessStatusCode();
                var responseBody = await response.Content.ReadAsStringAsync();
                var playerResults = JsonConvert.DeserializeObject<FplPlayerSearchResults>(responseBody);
                var findPlayer = playerResults.Elements.FindAll(x => String.Join(" ", x.First_Name.ToLower(), x.Second_Name.ToLower()).Contains(playerName.ToLower()));
                foreach (FplPlayerResult player in findPlayer)
                {
                    player.ImageUrl = $"{_options.Value.ImageUrl}{player.Code}.png";
                }
                var mapPlayer = _mapper.Map<List<PlayerResult>>(findPlayer);
                return new OkObjectResult(mapPlayer);
            }
            catch
            {
                return new StatusCodeResult(500);
            }
        }

        public async Task<IActionResult> GetPlayerProfile(PlayerResult playerDetails)
        {
            try
            {
                var response = await _httpClient.GetAsync($"element-summary/{playerDetails.Id}/");
                response.EnsureSuccessStatusCode();
                var responseBody = await response.Content.ReadAsStringAsync();
                var playerStats = JsonConvert.DeserializeObject<FplPlayerSeason>(responseBody);
                var mappedPlayer = _mapper.Map<PlayerProfile>(playerStats);
                mappedPlayer.PlayerDetails = playerDetails;
                return new OkObjectResult(mappedPlayer);
            }
            catch
            {
                return new StatusCodeResult(500);
            }
        }
    }
}
