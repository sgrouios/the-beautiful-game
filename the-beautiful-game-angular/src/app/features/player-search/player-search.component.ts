import { AfterViewInit, Component, ElementRef, EventEmitter, OnDestroy, Output, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable, EMPTY, Subject, fromEvent } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, takeUntil, tap } from 'rxjs/operators';
import { PlayerSearch } from 'src/app/models/player-search-results';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-player-search',
  templateUrl: './player-search.component.html',
  styleUrls: ['./player-search.component.scss']
})
export class PlayerSearchComponent implements AfterViewInit, OnDestroy {

  @ViewChild('searchInput') searchInput!: ElementRef;
  searchEvent!: Observable<KeyboardEvent>;
  playerSearchForm = this.initForm();
  playerResults$: Subject<PlayerSearch[]> = new Subject();
  resultsFound$: Subject<boolean> = new Subject();
  @Output() emitPlayer: EventEmitter<PlayerSearch> = new EventEmitter();
  destroy$: Subject<void> = new Subject();

  constructor(private playerService: PlayerService){}

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

  emitSearchResults(searchResults: PlayerSearch[]): void {
    this.playerResults$.next(searchResults);
    if(searchResults.length === 0)
      this.resultsFound$.next(false);
    else
      this.resultsFound$.next(true);
  }

  resetPlayerSearch(): void {
    this.playerSearchForm.reset();
    this.playerResults$.next([]);
    this.resultsFound$.next(true);
  }

  clearSearchField(): void {
    this.resetPlayerSearch();
  }

  getPlayer(player: PlayerSearch): void {
    this.resetPlayerSearch();
    this.emitPlayer.emit(player);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
