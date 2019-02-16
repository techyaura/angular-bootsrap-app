import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {AppService} from '../app.service';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private injector: Injector) {
  }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authService = this.injector.get(AppService);
    if (authService.getToken()) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${authService.getToken()}`
        }
      });
    }
    return next.handle(request);
  }
}
