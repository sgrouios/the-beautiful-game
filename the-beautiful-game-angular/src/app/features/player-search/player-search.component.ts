import { AfterViewInit, Component, ElementRef, EventEmitter, OnDestroy, Output, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable, EMPTY, Subject, fromEvent, BehaviorSubject } from 'rxjs';
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
  resultsFound$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  @Output() emitPlayer: EventEmitter<PlayerSearch> = new EventEmitter();
  destroy$: Subject<void> = new Subject();

  constructor(private playerService: PlayerService){}

  ngAfterViewInit(): void {
    this.searchEventSubscribe();
    this.clearSearchResultsSubscribe();
  }

  searchEventSubscribe(): void {
    this.searchEvent = fromEvent<KeyboardEvent>(this.searchInput.nativeElement, 'keyup')
    .pipe(
      takeUntil(this.destroy$),
      debounceTime<KeyboardEvent>(500),
      distinctUntilChanged<KeyboardEvent>(),
      tap(() => this.submitSearch())
    );
    this.searchEvent.subscribe();
  }

  clearSearchResultsSubscribe(): void {
    this.playerSearchForm.controls.playerName.valueChanges
    .pipe(
      takeUntil(this.destroy$),
      tap((name) => {
        if(name === '')
          this.resetPlayerSearch();
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
      this.playerSearch();
    }
  }

  playerSearch(): void {
    this.playerService.playerSearch(this.playerSearchForm.controls.playerName.value)
    .pipe(
      catchError((err) => {
        console.error(err);
        return EMPTY;
      }),
      tap((results) => 
      {
        this.emitSearchResults(results);
      })
    ).subscribe();
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

  getPlayer(player: PlayerSearch): void {
    this.resetPlayerSearch();
    this.emitPlayer.emit(player);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
