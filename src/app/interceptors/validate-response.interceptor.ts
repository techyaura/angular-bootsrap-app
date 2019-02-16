import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpResponse,
  HttpErrorResponse,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import {AppService} from '../app.service';

@Injectable()
export class ValidateResponseInterceptor implements HttpInterceptor {
  returnUrl: string;
  constructor(private router: Router, private authService: AppService) {
    // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    // console.log(this.returnUrl);
  }
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(tap(
      (event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          // console.log('RESPONSE COMES');
          // do stuff with response if you want
        }
      },
      (err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            console.log('401 ERRORS');
            this.authService.logout().then(() => {
              // this.router.navigate(['/auth/login']);
              window.location.reload();
            });
            // this.auth.collectFailedRequest(request);
            // redirect to the login route
            // or show a modal
          }
          if (err.status === 403) {
            this.authService.logout().then(status => {
              console.log('403 ERRORS');
              window.location.reload();
            });
            // this.auth.collectFailedRequest(request);
            // redirect to the login route
            // or show a modal
          }
          if (err.status === 404) {
            console.log('404 ERRORS');
            // this.auth.collectFailedRequest(request);
            // redirect to the login route
            // or show a modal
          }
          if (err.status === 505) {
            console.log('505 ERRORS');
            // this.auth.collectFailedRequest(request);
            // redirect to the login route
            // or show a modal
          }
        }
      }
    ));
  }
}
