import { Injectable } from '@angular/core';
import { HttpRequest, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpErrorHandler, HandleError } from '../../http-error-handler.service';
import { environment } from '../../../environments/environment';


@Injectable()
export class CategoryService {

  private handleError: HandleError;
  constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError();
   }

  remoteUrl = environment.apiUrl;

  add(postBody: any): Observable<any> {
    return this.http
      .post(`${this.remoteUrl}category`, postBody)
      .pipe(
        catchError(this.handleError('add', []))
      );
  }

  update(categoryId, postBody: any): Observable<any> {
    return this.http
      .put(`${this.remoteUrl}category/${categoryId}`, postBody)
      .pipe(
        catchError(this.handleError('login', []))
      );
  }

  view(categoryId): Observable<any> {
    return this.http
      .get(`${this.remoteUrl}category/${categoryId}`)
      .pipe(
        catchError(this.handleError('login', []))
      );
  }

  list(q = 'ALL'): Observable<any> {
    return this.http
      .get(`${this.remoteUrl}category?mode=${q}`)
      .pipe(
        catchError(this.handleError('login', []))
      );
  }

  remove(categoryId): Observable<any> {
    return this.http
      .delete(`${this.remoteUrl}category/${categoryId}`)
      .pipe(
        catchError(this.handleError('login', []))
      );
  }

}
