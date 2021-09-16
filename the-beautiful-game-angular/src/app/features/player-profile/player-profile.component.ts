import { Component, Input, OnInit } from '@angular/core';
import { Observable, EMPTY, Subject, Subscription } from 'rxjs';
import { catchError, finalize, switchMap, tap } from 'rxjs/operators';
import { FootballPosition } from 'src/app/models/football-position';
import { PlayerProfile } from 'src/app/models/player-profile';
import { PlayerSearch } from 'src/app/models/player-search-results';
import { LoadingService } from 'src/app/services/loading.service';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-player-profile',
  templateUrl: './player-profile.component.html',
  styleUrls: ['./player-profile.component.scss']
})
export class PlayerProfileComponent {

  playerProfile$: Subject<PlayerProfile> = new Subject();
  outfieldPositions = FootballPosition;

  constructor(private playerService: PlayerService,
              private loadingService: LoadingService){}

  getPlayerProfile(player: PlayerSearch): void {
    this.loadingService.setLoading(true);
    this.playerService.playerProfile(player)
    .pipe(
      catchError((err) => {
        console.error(err);
        return EMPTY;
      }),
      tap((profile) => this.playerProfile$.next(profile)),
      finalize(() => this.loadingService.setLoading(false))
    ).subscribe();
  }
}
