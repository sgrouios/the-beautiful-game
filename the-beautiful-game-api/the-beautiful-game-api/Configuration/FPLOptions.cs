
using System.ComponentModel.DataAnnotations;

namespace the_beautiful_game_api.Configuration
{
    public class FPLOptions
    {
        public static string FPLParentKey { get; set; } = "FPL";

        [Required]
        [Url]
        public string Url { get; set; }
        [Required]
        [Url]
        public string ImageUrl { get; set; }
    }
}
