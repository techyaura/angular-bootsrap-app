import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class CustomtoastrService {
  constructor(private toastr: ToastrService) {}

  success(message) {
    this.toastr.success(message);
  }

  error(err) {
    let errMsg = '';
    if (err && err.errors) {
      const errObj = err.errors;
      Object.keys(errObj).forEach(function(key) {
        errMsg = errMsg + errObj[key].msg + '\n';
      });
    } else {
      errMsg = err.message;
    }
    this.toastr.error(errMsg);
  }
}
