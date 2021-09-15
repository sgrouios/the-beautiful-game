import { Component, Input, OnInit } from '@angular/core';
import { Observable, EMPTY, Subject } from 'rxjs';
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
export class PlayerProfileComponent implements OnInit {

  @Input() playerSearch!: Observable<PlayerSearch>;
  playerProfile$: Subject<PlayerProfile> = new Subject();
  outfieldPositions = FootballPosition;

  constructor(private playerService: PlayerService){}
  
  ngOnInit(): void {
    this.playerSearch
    .pipe(
      switchMap((player) => {
        return this.getPlayerProfile(player)
      })
    ).subscribe();
  }

  getPlayerProfile(player: PlayerSearch): Observable<PlayerProfile> {
    return this.playerService.playerProfile(player)
    .pipe(
      catchError((err) => {
        console.error(err);
        return EMPTY;
      }),
      tap((profile) => this.playerProfile$.next(profile))
    );
  }
}
