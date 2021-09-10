using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using the_beautiful_game_api.Models;
using the_beautiful_game_api.Services.Interfaces;

namespace the_beautiful_game_api.Services
{
    public class PlayerStatsService : IPlayerStatsService
    {
        private readonly IFPLService _fplService;

        public PlayerStatsService(IFPLService fplService)
        {
            _fplService = fplService;
        }

        public async Task<IActionResult> SearchPlayer(string playerName)
        {
            return await _fplService.GetPlayerSearchResults(playerName);
        }

        public async Task<IActionResult> GetPlayerProfile(PlayerResult playerDetails)
        {
            return await _fplService.GetPlayerProfile(playerDetails);
        }
    }
}
