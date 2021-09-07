import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
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
      catchError((err) => throwError(err))
    );
  } 
}
