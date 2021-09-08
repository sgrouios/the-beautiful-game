import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';
import { Highlight } from '../models/highlight';

@Injectable({
  providedIn: 'root'
})
export class HighlightsService {

  private readonly apiUrl = `${environment.apiUrl}/highlights`;
  constructor(private http: HttpClient) { }

  getLatestHighlights(): Observable<Highlight[]> {
    return this.http.get<Highlight[]>(`${this.apiUrl}/latest`)
    .pipe(
      map((highlights) => {
        highlights.forEach(x => {
          x.date = new Date(x.date)
        })
        return highlights
      }),
      catchError((err) => throwError(err))
    );
  } 
}
