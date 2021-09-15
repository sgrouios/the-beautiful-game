using System.Collections.Generic;
using the_beautiful_game_api.Models;

namespace the_beautiful_game_api.Utilities
{
    public class PlayerProfileUtils
    {
        public static int CalculateGamesPlayed(List<FplPlayerMatchStats> matchHistory)
        {
            var gamesPlayed = matchHistory.Count;
            foreach(var match in matchHistory)
            {
                if(match.Minutes == 0)
                {
                    gamesPlayed--;
                }
            }
            return gamesPlayed;
        }
    }
}
