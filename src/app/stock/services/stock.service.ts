import { Injectable } from '@angular/core';
import { HttpRequest, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpErrorHandler, HandleError } from '../../http-error-handler.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  private handleError: HandleError;
  constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError();
   }

   remoteUrl = environment.apiUrl;

  transactionType() {
    return [
      {
        name: 'Buy',
        type: 'BUY'
      },
      {
        name: 'Sell',
        type: 'SELL'
      }
    ];
  }

  add(postBody: any): Observable<any> {
    return this.http
      .post(`${this.remoteUrl}stock`, postBody)
      .pipe(
        catchError(this.handleError('stock add', []))
      );
  }

  update(stockId, postBody: any): Observable<any> {
    return this.http
      .put(`${this.remoteUrl}stock/${stockId}`, postBody)
      .pipe(
        catchError(this.handleError('stock update', []))
      );
  }

  view(stockId): Observable<any> {
    return this.http
      .get(`${this.remoteUrl}stock/${stockId}`)
      .pipe(
        catchError(this.handleError('stock view', []))
      );
  }

  remove(stockId): Observable<any> {
    return this.http
      .delete(`${this.remoteUrl}stock/${stockId}`)
      .pipe(
        catchError(this.handleError('stock view', []))
      );
  }

  list(q: String = 'all'): Observable<any> {
    return this.http
      .get(`${this.remoteUrl}stock?q=${q}`)
      .pipe(
        catchError(this.handleError('stock list', []))
      );
  }

  listSystemStocks(q: String = 'all'): Observable<any> {
    return this.http
      .get(`${this.remoteUrl}allStock?q=${q}`)
      .pipe(
        catchError(this.handleError('System stock list', []))
      );
  }
}
