import { Injectable } from '@angular/core';
import { HttpRequest, HttpClient } from '@angular/common/http';
import { Observable,  } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';
import {
  HttpErrorHandler,
  HandleError
} from '../../http-error-handler.service';
import { environment } from '../../../environments/environment';
import { LocalstorageService } from './localstorage.service';

@Injectable()
export class AuthService {
  private handleError: HandleError;
  remoteUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler,
    private localStorageService: LocalstorageService
  ) {
    this.handleError = httpErrorHandler.createHandleError();
  }

  cachedRequests: Array<HttpRequest<any>> = [];

  public collectFailedRequest(request): void {
    this.cachedRequests.push(request);
  }

  public retryFailedRequests(): void {}

  getToken(): string {
    return localStorage.getItem('accessToken')
      ? JSON.parse(localStorage.getItem('accessToken'))
      : '';
  }

  isLoggedIn(): boolean {
    return this.getToken() ? true : false;
  }

  getSession(): any {
    return this.localStorageService.getItem('user');
  }

  getSessionId(): string {
    return this.getSession()._id;
  }

  logout() {
    return (
      this.localStorageService.removeItem('accessToken') &&
      this.localStorageService.removeItem('user')
    );
  }

  login(postBody: any): Observable<any> {
    return this.http
      .post(this.remoteUrl + 'auth/login', postBody)
      .pipe(catchError(this.handleError('login', [])));
  }

  register(postBody: any): Observable<any> {
    return this.http
      .post(this.remoteUrl + 'tplanner/register', postBody)
      .pipe(
        catchError(this.handleError('register', []))
      );
  }

  verify(hashToken, postBody: any): Observable<any> {
    return this.http
      .post(this.remoteUrl + 'tplanner/register/' + hashToken + '/verify', postBody)
      .pipe(catchError(this.handleError('verify register', [])));
  }

  recover(postBody: any): Observable<any> {
    return this.http
      .post(this.remoteUrl + 'tplanner/account/recover', postBody)
      .pipe(catchError(this.handleError('recover', [])));
  }

  recoverVerify(hashToken, postBody: any): Observable<any> {
    return this.http
      .post(
        this.remoteUrl + 'tplanner/account/recover/' + hashToken + '/verify',
        postBody
      )
      .pipe(catchError(this.handleError('recoverVerify', [])));
  }

  reset(hashToken, postBody: any): Observable<any> {
    return this.http
      .post(this.remoteUrl + 'tplanner/account/password/' + hashToken + '/reset', postBody)
      .pipe(catchError(this.handleError('reset', [])));
  }

  // viewUser(uId, username): Observable<any> {
  //   return this.http
  //     .get(this.remoteUrl + 'tplanner/user/' + uId + '/' + username)
  //     .pipe(catchError(this.handleError('login', [])));
  // }

  sessionUser(): Observable<any> {
    return this.http
      .get(this.remoteUrl + 'tplanner/user')
      .pipe(catchError(this.handleError('profile', [])));
  }

  update(postBody: any): Observable<any> {
    return this.http
      .put(this.remoteUrl + 'tplanner/user/update', postBody)
      .pipe(catchError(this.handleError('update', [])));
  }

  changePassword(postBody: any): Observable<any> {
    return this.http
      .post(this.remoteUrl + 'tplanner/user/changePassword', postBody)
      .pipe(catchError(this.handleError('login', [])));
  }

  // followers(uId): Observable<any> {
  //   return this.http
  //     .get(this.remoteUrl + 'user/followers/' + uId)
  //     .pipe(catchError(this.handleError('login', [])));
  // }

  // following(uId): Observable<any> {
  //   return this.http
  //     .get(this.remoteUrl + 'user/following/' + uId)
  //     .pipe(catchError(this.handleError('login', [])));
  // }

  // follow(uId, postBody = {}): Observable<any> {
  //   return this.http
  //     .post(this.remoteUrl + 'user/follow/' + uId, postBody)
  //     .pipe(catchError(this.handleError('login', [])));
  // }

  // unfollow(uId, postBody = {}): Observable<any> {
  //   return this.http
  //     .post(this.remoteUrl + 'user/unfollow/' + uId, postBody)
  //     .pipe(catchError(this.handleError('login', [])));
  // }

  // checkFollow(uId): Observable<any> {
  //   return this.http
  //     .get(this.remoteUrl + 'user/follow/check/' + uId)
  //     .pipe(catchError(this.handleError('login', [])));
  // }
}
