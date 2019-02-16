import { Injectable } from "@angular/core";
import { reject } from "q";

@Injectable()
export class LocalstorageService {
  constructor() {}

  setItem(key, val): any {
    return new Promise((resolve, reject)=> {
        localStorage.setItem(key, JSON.stringify(val));
        return resolve(true);
    });
  }

  getItem(key): any {
    return localStorage.getItem(key)
      ? JSON.parse(localStorage.getItem(key))
      : "";
  }

  removeItem(key): any {
    return localStorage.removeItem(key);
  }
}
