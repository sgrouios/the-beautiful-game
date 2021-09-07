using System;
using System.Collections.Generic;

namespace the_beautiful_game_api.Models
{
    public class Highlight
    {
        public string Title { get; set; }
        public string Competition { get; set; }
        public string MatchViewUrl { get; set; }
        public string Thumbnail { get; set; }
        public DateTime Date { get; set; }
        public List<Video> Videos { get; set; }

    }

    public class Video
    {
        public string Title { get; set; }
        public string Embed { get; set; }
    }
}
