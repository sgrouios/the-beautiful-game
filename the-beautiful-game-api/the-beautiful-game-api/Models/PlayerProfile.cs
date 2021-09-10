using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace the_beautiful_game_api.Models
{
    public class PlayerProfile
    {
        public PlayerResult PlayerDetails{ get; set; }
        public int GamesPlayed { get; set; }
        public int TotalMinutes { get; set; }
        public int Goals { get; set; }
        public int Assists { get; set; }
        public int CleanSheets { get; set; }
        public int GoalsConceded { get; set; }
        public int OwnGoals { get; set; }
        public int PenaltiesSaved { get; set; }
        public int PenaltiesMissed{ get; set; }
        public int YellowCards { get; set; }
        public int RedCards { get; set; }
        public int Saves { get; set; }
    }
}
