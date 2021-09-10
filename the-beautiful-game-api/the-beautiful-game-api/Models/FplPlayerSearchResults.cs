using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace the_beautiful_game_api.Models
{
    public class FplPlayerSearchResults
    {
        public List<FplPlayerResult> Elements { get; set; }
    }

    public class FplPlayerResult
    {
        public string First_Name { get; set; }
        public string Second_Name { get; set; }
        public int Code { get; set; }
        public int Id { get; set; }
        public string ImageUrl { get; set; }
        public int Element_Type { get; set; }

    }
}
