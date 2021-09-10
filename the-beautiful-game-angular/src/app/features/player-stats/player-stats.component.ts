import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EMPTY, fromEvent, Observable, Subject } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, takeUntil, tap } from 'rxjs/operators';
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
  }

  initForm(): FormGroup {
    return new FormGroup({
      playerName: new FormControl('', Validators.required)
    })
  }

  submitSearch(): void {
    console.log('submit search ran');
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
        this.playerResults$.next(results);
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
    this.playerSearchForm.reset();
    this.playerResults$.next([]);
    this.playerProfile(player).subscribe();
  }

  resetPlayerSearch(): void {
    this.playerSearchForm.reset();
    this.playerResults$.next([]);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
