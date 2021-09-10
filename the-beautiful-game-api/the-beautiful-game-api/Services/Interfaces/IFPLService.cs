using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using the_beautiful_game_api.Models;

namespace the_beautiful_game_api.Services.Interfaces
{
    public interface IFPLService
    {
        Task<IActionResult> GetPlayerSearchResults(string playerName);
        Task<IActionResult> GetPlayerProfile(PlayerResult playerDetails);
    }
}
