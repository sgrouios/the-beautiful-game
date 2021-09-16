import { Component, Input, OnInit } from '@angular/core';
import { Observable, EMPTY, Subject, Subscription } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { FootballPosition } from 'src/app/models/football-position';
import { PlayerProfile } from 'src/app/models/player-profile';
import { PlayerSearch } from 'src/app/models/player-search-results';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-player-profile',
  templateUrl: './player-profile.component.html',
  styleUrls: ['./player-profile.component.scss']
})
export class PlayerProfileComponent {

  playerProfile$: Subject<PlayerProfile> = new Subject();
  outfieldPositions = FootballPosition;

  constructor(private playerService: PlayerService){}

  getPlayerProfile(player: PlayerSearch): void {
    this.playerService.playerProfile(player)
    .pipe(
      catchError((err) => {
        console.error(err);
        return EMPTY;
      }),
      tap((profile) => this.playerProfile$.next(profile))
    ).subscribe();
  }
}
