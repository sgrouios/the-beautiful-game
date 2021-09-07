using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using the_beautiful_game_api.Services;

namespace the_beautiful_game_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HighlightsController : ControllerBase
    {
        private readonly IHighlightsService _highlightsService;

        public HighlightsController(IHighlightsService latestHighlightsService)
        {
            _highlightsService = latestHighlightsService;
        }

        [HttpGet]
        [Route("latest")]
        public async Task<IActionResult> GetLatestHighlights()
        {
            return await _highlightsService.GetLatestHighlights();
        }

        [HttpGet]
        [Route("latest/premier-league")]
        public async Task<IActionResult> GetLatestPremierLeagueHighlights()
        {
            return await _highlightsService.GetLatestPremierLeagueHighlights();
        }
    }
}
