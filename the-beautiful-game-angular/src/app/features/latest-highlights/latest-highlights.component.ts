import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject, EMPTY, Subject } from 'rxjs';
import { catchError, take, tap } from 'rxjs/operators';
import { Highlight } from 'src/app/models/highlight';
import { HighlightsService } from 'src/app/services/highlights.service';
@Component({
  selector: 'app-latest-highlights',
  templateUrl: './latest-highlights.component.html',
  styleUrls: ['./latest-highlights.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LatestHighlightsComponent implements OnInit {

  allHighlights: Highlight[] = [];
  latestHighlightsSelected$: BehaviorSubject<Highlight[]> = new BehaviorSubject<Highlight[]>([]);
  dates$: BehaviorSubject<Date[]> = new BehaviorSubject<Date[]>([]);
  dateSelected!: Date;
  allSelected = true;

  constructor(private highLightsService: HighlightsService) { }

  ngOnInit(): void {
    this.highLightsService.getLatestHighlights()
    .pipe(
      catchError((err) => {
        console.error(err);
        return EMPTY;
      }),
      tap((highlights) => {
        this.allHighlights = highlights;
        this.dates$.next(this.getHighlightDates(this.allHighlights));
        this.latestHighlightsSelected$.next(this.allHighlights);
      })
    ).subscribe();
  }

  getHighlightDates(highlights: Highlight[]): Date[] {
    let dates: Date[] = [];
    highlights.forEach(hl => {
      if(!dates.find(x => x.toDateString() === new Date(hl.date).toDateString()))
        dates.push(new Date(new Date(hl.date).toDateString()));
    });
    return dates;
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
}
