using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace the_beautiful_game_api.Models
{
    public class FplPlayerSeason
    {
        public List<FplPlayerMatchStats> History { get; set; }
    }

    public class FplPlayerMatchStats
    {
        public int Minutes { get; set; }
        public int Goals_Scored { get; set; }
        public int Assists { get; set; }
        public int Clean_Sheets { get; set; }
        public int Goals_Conceded { get; set; }
        public int Own_Goals { get; set; }
        public int Penalties_Saved { get; set; }
        public int Penalties_Missed { get; set; }
        public int Yellow_Cards { get; set; }
        public int Red_Cards { get; set; }
        public int Saves { get; set; }
    }
}
