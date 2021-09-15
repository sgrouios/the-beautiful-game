using AutoMapper;
using System.Linq;
using the_beautiful_game_api.Enums;
using the_beautiful_game_api.Models;
using the_beautiful_game_api.Utilities;

namespace the_beautiful_game_api.Mappers
{
    public class Mappers : Profile
    {
        public Mappers()
        {
            CreateMap<FplPlayerResult, PlayerResult>()
                .ForMember(x => x.FirstName, opt => opt.MapFrom(x => x.First_Name))
                .ForMember(x => x.Surname, opt => opt.MapFrom(x => x.Second_Name))
                .ForMember(x => x.Position, opt => opt.MapFrom(x => FootballPosition.DeterminePosition(x.Element_Type)));
            
            CreateMap<FplPlayerSeason, PlayerProfile>()
                .ForMember(x => x.GamesPlayed, opt => opt.MapFrom(x => PlayerProfileUtils.CalculateGamesPlayed(x.History)))
                .ForMember(x => x.TotalMinutes, opt => opt.MapFrom(x => x.History.Sum(x => x.Minutes)))
                .ForMember(x => x.Goals, opt => opt.MapFrom(x => x.History.Sum(x => x.Goals_Scored)))
                .ForMember(x => x.Assists, opt => opt.MapFrom(x => x.History.Sum(x => x.Assists)))
                .ForMember(x => x.CleanSheets, opt => opt.MapFrom(x => x.History.Sum(x => x.Clean_Sheets)))
                .ForMember(x => x.GoalsConceded, opt => opt.MapFrom(x => x.History.Sum(x => x.Goals_Conceded)))
                .ForMember(x => x.OwnGoals, opt => opt.MapFrom(x => x.History.Sum(x => x.Own_Goals)))
                .ForMember(x => x.PenaltiesSaved, opt => opt.MapFrom(x => x.History.Sum(x => x.Penalties_Saved)))
                .ForMember(x => x.PenaltiesMissed, opt => opt.MapFrom(x => x.History.Sum(x => x.Penalties_Missed)))
                .ForMember(x => x.YellowCards, opt => opt.MapFrom(x => x.History.Sum(x => x.Yellow_Cards)))
                .ForMember(x => x.RedCards, opt => opt.MapFrom(x => x.History.Sum(x => x.Red_Cards)))
                .ForMember(x => x.Saves, opt => opt.MapFrom(x => x.History.Sum(x => x.Saves)));
        }
    }
}
