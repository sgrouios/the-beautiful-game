import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EMPTY, fromEvent, Observable, Subject } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, takeUntil, tap } from 'rxjs/operators';
import { FootballPosition } from 'src/app/models/football-position';
import { PlayerProfile } from 'src/app/models/player-profile';
import { PlayerSearch } from 'src/app/models/player-search-results';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-player-stats',
  templateUrl: './player-stats.component.html',
  styleUrls: ['./player-stats.component.scss']
})
export class PlayerStatsComponent implements AfterViewInit, OnDestroy {

  @ViewChild('searchInput') searchInput!: ElementRef;
  playerResults$: Subject<PlayerSearch[]> = new Subject();
  playerSearchForm = this.initForm();
  searchEvent!: Observable<KeyboardEvent>;
  playerProfile$: Subject<PlayerProfile> = new Subject();
  resultsFound$: Subject<boolean> = new Subject();
  outfieldPositions = FootballPosition;
  destroy$: Subject<void> = new Subject();

  constructor(private playerService: PlayerService){}
  
  clearSearchResults(): void {
    this.playerSearchForm.controls.playerName.valueChanges
    .pipe(
      takeUntil(this.destroy$),
      tap((name) => {
        if(name === '')
          this.playerResults$.next([]);
      })
    ).subscribe();
  }

  ngAfterViewInit(): void {
    this.searchEvent = fromEvent<KeyboardEvent>(this.searchInput.nativeElement, 'keyup')
    .pipe(
      takeUntil(this.destroy$),
      debounceTime<KeyboardEvent>(500),
      distinctUntilChanged<KeyboardEvent>(),
      tap(() => this.submitSearch())
    );
    this.searchEvent.subscribe();
    this.clearSearchResults();
    this.resultsFound$.next(true);
  }

  initForm(): FormGroup {
    return new FormGroup({
      playerName: new FormControl('', Validators.required)
    })
  }

  submitSearch(): void {
    if(this.playerSearchForm.valid){
      this.playerSearch()
      .subscribe();
    }
  }

  playerSearch(): Observable<PlayerSearch[]> {
    return this.playerService.playerSearch(this.playerSearchForm.controls.playerName.value)
    .pipe(
      catchError((err) => {
        console.error(err);
        return EMPTY;
      }),
      tap((results) => 
      {
        this.emitSearchResults(results);
      })
    );
  }

  playerProfile(player: PlayerSearch): Observable<PlayerProfile> {
    return this.playerService.playerProfile(player)
    .pipe(
      catchError((err) => {
        console.error(err);
        return EMPTY;
      }),
      tap((profile) => this.playerProfile$.next(profile))
    );
  }

  getPlayer(player: PlayerSearch): void {
    this.resetPlayerSearch();
    this.playerProfile(player).subscribe();
  }

  resetPlayerSearch(): void {
    this.playerSearchForm.reset();
    this.playerResults$.next([]);
  }

  emitSearchResults(searchResults: PlayerSearch[]): void {
    this.playerResults$.next(searchResults);
    if(searchResults.length === 0)
      this.resultsFound$.next(false);
    else
      this.resultsFound$.next(true);
  }

  clearSearchField(): void {
    this.resetPlayerSearch();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
