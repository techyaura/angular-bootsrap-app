import { Injectable } from '@angular/core';

@Injectable()
export class AppService {

  constructor() { }

  isLoggedIn(): boolean {
    return this.getToken() ? true : false;
  }

  getToken(): string {
    return localStorage.getItem('accessToken')
      ? JSON.parse(localStorage.getItem('accessToken'))
      : '';
  }

  getSession(): any {
    return localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user'))
      : '';
  }

  getSessionId(): string {
    return this.getSession()._id;
  }

  logout() {
    return new Promise((resolve, reject) => {
      if (this.removeExistingItem('accessToken') && this.removeExistingItem('user')) {
        return resolve(true);
      }
      return reject(false);
    });
  }

  removeExistingItem(key) {
    if (localStorage.getItem(key) === null) {
      return false;
    }
    localStorage.removeItem(key);
    return true;
  }

}
