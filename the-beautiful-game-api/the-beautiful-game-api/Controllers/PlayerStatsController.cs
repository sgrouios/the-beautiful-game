using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using the_beautiful_game_api.Models;
using the_beautiful_game_api.Services;

namespace the_beautiful_game_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlayerStatsController : ControllerBase
    {
        private readonly IPlayerStatsService _playerStatsService;

        public PlayerStatsController(IPlayerStatsService playerStatsService)
        {
            _playerStatsService = playerStatsService;
        }

        [HttpGet]
        [Route("name/{playerName}")]
        public async Task<IActionResult> SearchPlayer(string playerName)
        {
            return await _playerStatsService.SearchPlayer(playerName);
        }

        [HttpPost]
        [Route("profile")]
        public async Task<IActionResult> GetPlayerProfile(PlayerResult playerDetails)
        {
            return await _playerStatsService.GetPlayerProfile(playerDetails);
        }
    }
}
