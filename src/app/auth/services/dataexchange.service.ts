import { Injectable } from '@angular/core';
import { Observable ,  BehaviorSubject } from 'rxjs';

@Injectable()
export class DataexchangeService {
  constructor() {}

  private loggedInData = new BehaviorSubject<{}>({});

  setLoggedInData(message: {}) {
    this.loggedInData.next(message);
  }

  getLoggedInData(): Observable<any> {
    return this.loggedInData.asObservable();
  }

  private searchData = new BehaviorSubject<string>('');

  setSearchData(message: string) {
    this.searchData.next(message);
  }

  getSearchData(): Observable<string> {
    return this.searchData.asObservable();
  }

  private showSearchBoxData = new BehaviorSubject<boolean>(true);

  setShowSearchBoxData(message: boolean) {
    this.showSearchBoxData.next(message);
  }

  getShowSearchBoxData(): Observable<boolean> {
    return this.showSearchBoxData.asObservable();
  }

  private showHomeBanner = new BehaviorSubject<boolean>(true);

  setShowHomeBanner(message: boolean) {
    this.showHomeBanner.next(message);
  }

  getShowHomeBanner(): Observable<boolean> {
    return this.showHomeBanner.asObservable();
  }
}
