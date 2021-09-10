import { PlayerSearch } from "./player-search-results";

export interface PlayerProfile {
    playerDetails: PlayerSearch;
    gamesPlayed: number;
    totalMinutes: number;
    goals: number;
    assists: number;
    cleanSheets: number;
    goalsConceded: number;
    ownGoals: number;
    penaltiesSaved: number;
    penaltiesMissed: number;
    yellowCards: number;
    redCards: number;
    saves: number;
}