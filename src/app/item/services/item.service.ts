import { Injectable } from '@angular/core';
import { HttpRequest, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpErrorHandler, HandleError } from '../../http-error-handler.service';
import { environment } from '../../../environments/environment';


@Injectable()
export class ItemService {
  private handleError: HandleError;
  constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError();
   }

  remoteUrl = environment.apiUrl;

  add(postBody: any): Observable<any> {
    return this.http
      .post(`${this.remoteUrl}item`, postBody)
      .pipe(
        catchError(this.handleError('login', []))
      );
  }

  update(categoryId, postBody: any): Observable<any> {
    return this.http
      .put(`${this.remoteUrl}item/${categoryId}`, postBody)
      .pipe(
        catchError(this.handleError('login', []))
      );
  }

  view(categoryId): Observable<any> {
    return this.http
      .get(`${this.remoteUrl}item/${categoryId}`)
      .pipe(
        catchError(this.handleError('login', []))
      );
  }

  list(): Observable<any> {
    return this.http
      .get(`${this.remoteUrl}item`)
      .pipe(
        catchError(this.handleError('login', []))
      );
  }

  remove(categoryId): Observable<any> {
    return this.http
      .delete(`${this.remoteUrl}item/${categoryId}`)
      .pipe(
        catchError(this.handleError('login', []))
      );
  }

}
