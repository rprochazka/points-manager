import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IPointRecord, IKeyValuePair } from '../domain';


@Injectable({
  providedIn: 'root'
})
export class PointsService {

  constructor(private httpClient: HttpClient) { }

  getPoints(): Observable<IPointRecord[]> {
    return this.httpClient.get<IPointRecord[]>('http://localhost:3000/points')
      .pipe(
        catchError(this.handleError)
      );
  }

  addPoint(pointRecord: IPointRecord): Observable<void> {
    return this.httpClient.post<void>('http://localhost:3000/points', pointRecord)
      .pipe(
        catchError(this.handleError)
      );
  }

  getOwners(): Observable<IKeyValuePair[]> {
    return this.httpClient.get<IKeyValuePair[]>('http://localhost:3000/owners')
      .pipe(
        catchError(this.handleError)
      );
  }

  getReasons(): Observable<IKeyValuePair[]> {
    return this.httpClient.get<IKeyValuePair[]>('http://localhost:3000/reasons')
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }
}
