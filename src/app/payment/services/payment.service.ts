import { Injectable } from '@angular/core';
import { HttpRequest, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpErrorHandler, HandleError } from '../../http-error-handler.service';
import { environment } from '../../../environments/environment';

@Injectable()
export class PaymentService {

  private handleError: HandleError;
  constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError();
   }

  remoteUrl = environment.apiUrl;

  yearArr() {
    const yearsArray = [
      {
        name: '2018',
        value: 2018
      },
      {
        name: '2019',
        value: 2019
      }
    ];
    return yearsArray;
  }

  monthArr() {
    const monthsArray = [
      {
        name: 'JANUARY',
        value: 1
      },
      {
        name: 'FEBUARY',
        value: 2
      },
      {
        name: 'MARCH',
        value: 3
      },
      {
        name: 'APRIL',
        value: 4
      },
      {
        name: 'MAY',
        value: 5
      },
      {
        name: 'JUNE',
        value: 6
      },
      {
        name: 'JULY',
        value: 7
      },
      {
        name: 'AUGUST',
        value: 8
      },
      {
        name: 'SEPTEMBER',
        value: 9
      },
      {
        name: 'OCTOBER',
        value: 10
      },
      {
        name: 'NOVEMBER',
        value: 11
      },
      {
        name: 'DECEMBER',
        value: 12
      }
    ];
    return monthsArray;
  }

  add(postBody: any): Observable<any> {
    return this.http
      .post(`${this.remoteUrl}payment`, postBody)
      .pipe(
        catchError(this.handleError('login', []))
      );
  }

  update(paymentId, postBody: any): Observable<any> {
    return this.http
      .put(`${this.remoteUrl}payment/${paymentId}`, postBody)
      .pipe(
        catchError(this.handleError('login', []))
      );
  }

  view(paymentId): Observable<any> {
    return this.http
      .get(`${this.remoteUrl}payment/${paymentId}`)
      .pipe(
        catchError(this.handleError('login', []))
      );
  }

  list(q: String = 'all', ct: String = 'all', mode: String = 'all'): Observable<any> {
    return this.http
      .get(`${this.remoteUrl}payment?q=${q}&ct=${ct}&mode=${mode}`)
      .pipe(
        catchError(this.handleError('login', []))
      );
  }

  timeline(ct: String = 'all', mode: String = 'all', q: String = 'all'): Observable<any> {
    return this.http
      .get(`${this.remoteUrl}payment/timeline?q=${q}&ct=${ct}&mode=${mode}`)
      .pipe(
        catchError(this.handleError('login', []))
      );
  }

  remove(categoryId): Observable<any> {
    return this.http
      .delete(`${this.remoteUrl}payment/${categoryId}`)
      .pipe(
        catchError(this.handleError('login', []))
      );
  }

  expensePerCategoryInMonth(month, year): Observable<any> {
    return this.http
      .get(`${this.remoteUrl}payment/expense/month/category?month=${month}&year=${year}`)
      .pipe(
        catchError(this.handleError('login', []))
      );
  }

  expensePerModeInMonth(month, year): Observable<any> {
    return this.http
      .get(`${this.remoteUrl}payment/expense/month/mode?month=${month}&year=${year}`)
      .pipe(
        catchError(this.handleError('login', []))
      );
  }

  expensePerDayInMonth(month, year): Observable<any> {
    return this.http
      .get(`${this.remoteUrl}payment/expense/month/day?month=${month}&year=${year}`)
      .pipe(
        catchError(this.handleError('login', []))
      );
  }

  expensePerMonthInYear(month, year): Observable<any> {
    return this.http
      .get(`${this.remoteUrl}payment/expense/year/month?month=${month}&year=${year}`)
      .pipe(
        catchError(this.handleError('login', []))
      );
  }

  expensePerCategoryInYear(month, year): Observable<any> {
    return this.http
      .get(`${this.remoteUrl}payment/expense/year/category?month=${month}&year=${year}`)
      .pipe(
        catchError(this.handleError('login', []))
      );
  }

}
