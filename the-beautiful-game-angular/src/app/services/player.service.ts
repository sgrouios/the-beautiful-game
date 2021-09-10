import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { PlayerProfile } from '../models/player-profile';
import { PlayerSearch } from '../models/player-search-results';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  private readonly apiUrl = `${environment.apiUrl}/playerStats`;

  constructor(private http: HttpClient) { }

  playerSearch(playerName: string): Observable<PlayerSearch[]> {
    return this.http.get<PlayerSearch[]>(`${this.apiUrl}/name/${playerName}`)
    .pipe(
      catchError((err) => throwError(err))
    );
  }

  playerProfile(playerDetails: PlayerSearch): Observable<PlayerProfile> {
    return this.http.post<PlayerProfile>(`${this.apiUrl}/profile`, playerDetails)
    .pipe(
      catchError((err) => throwError(err))
    );
  }
}
