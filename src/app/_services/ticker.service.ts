import { Injectable } from '@angular/core';
import { Ticker } from '../_models/ticker';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class TickerService {

  constructor(private http: HttpClient) { }

  getTickers(): Observable<Ticker[]> {
    return this.http.get<Ticker[]>(`${environment.apiUrl}/tickers`)
      .pipe(
        // map(res => res.map(item => ({ id: item['id'], ticker: item['tname'], url: item['url'], own: item['own'], xdiv: item['xdiv'], quote: item['quote'] }))),
        // tap(tickers => this.log(`fetched stocks ` + tickers)),
        catchError(this.handleError('getStocks', []))
      );
  }

  getTicker(symbol: String): Observable<any> {
    const url = `${environment.apiUrl}/tickers/${symbol}`;
    return this.http.get<any>(url).pipe(
      // tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<any>(`getTicker symbol=${symbol}`))
    );
  }

  fetchData(): any {
    const url = `${environment.apiUrl}/tickers/fetch`;
    return this.http.post<any>(url,'').pipe(
      // tap(_ => this.log(`fetchData - SUCCESS`)),
      catchError(this.handleError<any>(`fetchData`))
    );
  }

  private log(message: string) {
    console.log(message)
  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
