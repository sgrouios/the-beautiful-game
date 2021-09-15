import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { PlayerSearch } from 'src/app/models/player-search-results';

@Component({
  selector: 'app-player-stats',
  templateUrl: './player-stats.component.html',
  styleUrls: ['./player-stats.component.scss']
})
export class PlayerStatsComponent {

  playerSubject$: Subject<PlayerSearch> = new Subject();
  player$ = this.playerSubject$.asObservable();
  
  playerSearch(player: PlayerSearch): void {
    this.playerSubject$.next(player);
  }
}
