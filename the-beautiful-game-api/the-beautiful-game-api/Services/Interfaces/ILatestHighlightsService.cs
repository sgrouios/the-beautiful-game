using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace the_beautiful_game_api.Services
{
    public interface ILatestHighlightsService
    {
        Task<IActionResult> GetLatestHighlights();
        Task<IActionResult> GetLatestPremierLeagueHighlights();
    }
}