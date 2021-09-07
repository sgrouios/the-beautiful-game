using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using the_beautiful_game_api.Services;

namespace the_beautiful_game_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HighlightsController : ControllerBase
    {
        private readonly ILatestHighlightsService _latestHighlightsService;

        public HighlightsController(ILatestHighlightsService latestHighlightsService)
        {
            _latestHighlightsService = latestHighlightsService;
        }

        [HttpGet]
        [Route("latest")]
        public async Task<IActionResult> GetLatestHighlights()
        {
            return await _latestHighlightsService.GetLatestHighlights();
        }

        [HttpGet]
        [Route("latest/premier-league")]
        public async Task<IActionResult> GetLatestPremierLeagueHighlights()
        {
            return await _latestHighlightsService.GetLatestPremierLeagueHighlights();
        }
    }
}
