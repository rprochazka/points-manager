import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, from, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { IPointRecord, IKeyValuePair } from '../domain';
import { PagedItems, PointsFilter, OrderByDirection } from '../domain/point-record';


@Injectable({
  providedIn: 'root'
})
export class PointsService {

  constructor(private httpClient: HttpClient) { }

  getPoints(pointsFilter: PointsFilter): Observable<PagedItems<IPointRecord>> {
    const filterUrlParams = this.generateUrlFilterParams(pointsFilter);
    let url = this.getBaseUlr();
    if (filterUrlParams) {
      url += '?' + filterUrlParams;
    }

    return this.httpClient.get<IPointRecord[]>(url, { observe: 'response' })
      .pipe(
        map((resp) => {
          const response = new PagedItems();
          response.items = resp.body;
          response.totalCount = Number(resp.headers.get('x-total-count'));
          response.pageSize = pointsFilter.queryOptions.take;
          response.pageIndex = pointsFilter.queryOptions.skipPages;
          return response;
        }),
        catchError(this.handleError)
      );
  }

  addPoint(pointRecord: IPointRecord): Observable<void> {
    pointRecord.lastModifiedDate = new Date().toJSON();
    return this.httpClient.post<void>('http://localhost:3000/points', pointRecord)
      .pipe(
        catchError(this.handleError)
      );
  }

  getOwners(): Observable<string[]> {
    return of(['Stepa', 'Rozi', 'Radek', 'Iva']);
  }

  getReasons(): Observable<string[]> {
    return of(['Vysavani', 'Utirani prachu']);
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

  private generateUrlFilterParams(pointsFilter: PointsFilter) {
    const filterParams = [];
    filterParams.push(this.handleFiltering(pointsFilter));
    filterParams.push(this.handleSearching(pointsFilter));
    filterParams.push(this.handlePaging(pointsFilter));
    filterParams.push(this.handleSorting(pointsFilter));

    return filterParams.filter((p) => p).join('&');
  }

  private handleFiltering(pointsFilter: PointsFilter): string {
    const filterKeys = ['owner', 'reason', 'lastModifiedBy'];
    const paramsDic = [];
    Object.keys(pointsFilter).forEach((key) => {
      if (filterKeys.indexOf(key) > -1 && pointsFilter[key]) {
        paramsDic.push(`${key}=${pointsFilter[key]}`);
      }
    });

    return paramsDic.join('&');
  }

  private handleSearching(pointsFilter: PointsFilter): string {
    if (pointsFilter.queryOptions && pointsFilter.queryOptions.searchExpression) {
      return `q=${pointsFilter.queryOptions.searchExpression}`;
    }
    return null;
  }

  private handlePaging(pointsFilter: PointsFilter): string {
    const urlParams = [];
    if (pointsFilter.queryOptions && pointsFilter.queryOptions.take && pointsFilter.queryOptions.take > 0) {
      urlParams.push(`_limit=${pointsFilter.queryOptions.take}`);
    }
    if (pointsFilter.queryOptions && pointsFilter.queryOptions.skip && pointsFilter.queryOptions.take > 0) {
      urlParams.push(`_page=${pointsFilter.queryOptions.skipPages}`);
    }
    return urlParams.join('&');
  }

  private handleSorting(pointsFilter: PointsFilter): string {
    const urlParams = [];
    if (pointsFilter.queryOptions && pointsFilter.queryOptions.orderBy) {
      const orderBy = pointsFilter.queryOptions.orderBy[0];
      if (orderBy) {
        urlParams.push(`_order=${orderBy.direction === OrderByDirection.Asc ? 'asc' : 'desc'}`);
        urlParams.push(`_sort=${orderBy.property}`);
      }
    }

    return urlParams.join('&');
  }

  private getBaseUlr(): string {
    return 'http://localhost:3000/points';
  }
}
