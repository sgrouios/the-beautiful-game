import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  loadingSubject$ = new BehaviorSubject(false);
  loading$ = this.loadingSubject$.asObservable();
  
  setLoading(bool: boolean): void {
    this.loadingSubject$.next(bool);
  }
}
