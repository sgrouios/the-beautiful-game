import { AfterViewInit, ChangeDetectionStrategy, Component } from '@angular/core';
import { BehaviorSubject, EMPTY, Subject } from 'rxjs';
import { catchError, finalize, take, tap } from 'rxjs/operators';
import { Highlight } from 'src/app/models/highlight';
import { HighlightsService } from 'src/app/services/highlights.service';
import { LoadingService } from 'src/app/services/loading.service';
@Component({
  selector: 'app-latest-highlights',
  templateUrl: './latest-highlights.component.html',
  styleUrls: ['./latest-highlights.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LatestHighlightsComponent implements AfterViewInit {

  allHighlights!: Highlight[];
  latestHighlightsSelected$: BehaviorSubject<Highlight[]> = new BehaviorSubject<Highlight[]>([]);
  dates$: Subject<Date[]> = new Subject();
  dateSelected!: Date;
  allSelected = true;
  searchFilterSubject$ = new BehaviorSubject('all');
  searchFilter$ = this.searchFilterSubject$.asObservable();
  teams$: Subject<string[]> = new Subject();

  constructor(private highLightsService: HighlightsService,
              private loadingService: LoadingService) { }
  
  ngAfterViewInit(): void {
    this.getLatestHighlights();
  }

  getLatestHighlights(): void {
    this.loadingService.setLoading(true);
    this.highLightsService.getLatestHighlights()
    .pipe(
      catchError((err) => {
        console.error(err);
        return EMPTY;
      }),
      tap((highlights) => {
        // store all highlights in local scope to be able to emit based on search-criteria
        this.allHighlights = highlights;
        // get all dates by month/day to display
        this.dates$.next(this.getHighlightDates(this.allHighlights));
        this.teams$.next(this.getHighlightTeams(highlights));
        // emit all highlights retrieved - default
        this.latestHighlightsSelected$.next(this.allHighlights);
      }),
      finalize(() => this.loadingService.setLoading(false))
    ).subscribe();
  }
  
  /**
   * Accepts array of highlights - 'highlights' and adds each unique date property to a new array
   * @param  {Highlight[]} highlights
   * @returns Date[]
   */
  getHighlightDates(highlights: Highlight[]): Date[] {
    let dates: Date[] = [];
    highlights.forEach(hl => {
      if(!dates.find(x => x.toDateString() === new Date(hl.date).toDateString()))
        dates.push(new Date(new Date(hl.date).toDateString()));
    });
    return dates;
  }

  getHighlightTeams(highlights: Highlight[]): string[] {
    const teams: string[] = [];
    highlights.forEach(hl => {
      const highlightTeams = hl.title.split(' - ');
      highlightTeams.forEach(team => {
        if(!teams.includes(team))
          teams.push(team);
      })
    });
    return teams.sort();
  }

  selectAllHighlights(): void {
    this.latestHighlightsSelected$
    .pipe(
      take(1),
      tap((highlights) => {
        if(highlights !== this.allHighlights)
          this.latestHighlightsSelected$.next(this.allHighlights);
      })
    ).subscribe();
    this.allSelected = true;
    this.dateSelected = new Date();
  }

  selectDate(date: Date): void {
    this.allSelected = false;
    this.dateSelected = date;
    this.latestHighlightsSelected$.next(this.allHighlights.filter(x => x.date.toDateString() === date.toDateString()));
  }

  changeFilter(filter: string): void {
    this.searchFilterSubject$.next(filter);
    if(filter === 'all')
      this.selectAllHighlights();
  }

  teamHighlights(team: string): void {
    this.latestHighlightsSelected$.next(this.allHighlights.filter(x => x.title.includes(team)));
  }
}
