import { Injectable } from '@angular/core';
import { HttpRequest, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpErrorHandler, HandleError } from '../../http-error-handler.service';
import { environment } from '../../../environments/environment';

@Injectable()
export class CardService {
  private handleError: HandleError;

  constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError();
   }

  remoteUrl = environment.apiUrl;

  add(postBody: any): Observable<any> {
    return this.http
      .post(`${this.remoteUrl}card`, postBody)
      .pipe(
        catchError(this.handleError('login', []))
      );
  }

  update(cardId, postBody: any): Observable<any> {
    return this.http
      .put(`${this.remoteUrl}card/${cardId}`, postBody)
      .pipe(
        catchError(this.handleError('login', []))
      );
  }

  view(cardId): Observable<any> {
    return this.http
      .get(`${this.remoteUrl}card/${cardId}`)
      .pipe(
        catchError(this.handleError('login', []))
      );
  }

  list(q: String = 'all', ct: String = 'all', mode: String = 'all'): Observable<any> {
    return this.http
      .get(`${this.remoteUrl}card?q=${q}&ct=${ct}&mode=${mode}`)
      .pipe(
        catchError(this.handleError('login', []))
      );
  }

  banks(): Observable<any> {
    return this.http
      .get(`${this.remoteUrl}payment/banks`)
      .pipe(
        catchError(this.handleError('banks', []))
      );
  }

  remove(categoryId): Observable<any> {
    return this.http
      .delete(`${this.remoteUrl}card/${categoryId}`)
      .pipe(
        catchError(this.handleError('login', []))
      );
  }

  payTypes(): Observable<any> {
    return this.http
      .get(`${this.remoteUrl}payment/types`)
      .pipe(
        catchError(this.handleError('payment', []))
      );
  }

}
