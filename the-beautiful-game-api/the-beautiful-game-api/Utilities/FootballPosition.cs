using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace the_beautiful_game_api.Enums
{
    public static class FootballPosition
    {
        public static string DeterminePosition(int positionCode)
        {
            switch (positionCode)
            {
                case 1: 
                    return "Goalkeeper";
                case 2: 
                    return "Defender";
                case 3: 
                    return "Midfielder";
                case 4: 
                    return "Forward";
                default: 
                    return "Position unavailable";
            }
        }


    }
}
