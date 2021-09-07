import { Component, OnInit } from '@angular/core';
import { EMPTY, Observable, Subject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Highlight } from 'src/app/models/highlight';
import { HighlightsService } from 'src/app/services/highlights.service';

@Component({
  selector: 'app-latest-highlights',
  templateUrl: './latest-highlights.component.html',
  styleUrls: ['./latest-highlights.component.scss']
})
export class LatestHighlightsComponent implements OnInit {

  latestHighlights$: Subject<Highlight[]> = new Subject();

  constructor(private highLightsService: HighlightsService) { }

  ngOnInit(): void {
    this.highLightsService.getLatestHighlights()
    .pipe(
      catchError((err) => {
        console.error(err);
        return EMPTY;
      }),
      tap((highlights) => {
        this.latestHighlights$.next(highlights);
      })
    ).subscribe();
  }

}
