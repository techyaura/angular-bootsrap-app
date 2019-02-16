import { DOCUMENT } from '@angular/platform-browser';
import { Inject } from '@angular/core';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { CustomtoastrService } from '../../services/customtoastr.service';
import { LocalstorageService } from '../services/localstorage.service';
import { DataexchangeService } from '../services/dataexchange.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isChecked = false;
  returnUrl: string;
  loginButtonText: String = 'Login';
  loginButtonDisabled: Boolean = false;

  constructor(
    @Inject(DOCUMENT) private document: any,
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataexchangeService,
    private authService: AuthService,
    private fb: FormBuilder,
    private toastr: CustomtoastrService,
    private localStorageService: LocalstorageService
  ) {}

  formObj: FormGroup;

  ngOnInit() {
    this.localStorageService.removeItem('isVerified');
    this.document.body.classList.add('be-splash-screen');
    this.formObj = this.fb.group(
      {
        email: [''],
        password: ['', [Validators.maxLength(20)]],
        // role: ['CUSTOMER', [Validators.required]]
      },
      { updateOn: 'submit' }
    );

    if (this.authService.isLoggedIn()) {
      this.document.body.classList.remove('be-splash-screen');
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
      this.router.navigateByUrl(this.returnUrl);
    }
  }

  login() {
    if (this.formObj && this.formObj.valid) {
      this.loginButtonDisabled = true;
      this.loginButtonText = 'Logging In ...';
      this.authService.login(this.formObj.value).subscribe(
        response => {
          if (response.hasOwnProperty('token')) {
            localStorage.setItem('accessToken', JSON.stringify(response.token));
            localStorage.setItem('user', JSON.stringify(response.data));
            location.reload();
            this.loginButtonDisabled = false;
          }
        },
        err => {
          this.loginButtonDisabled = false;
          this.loginButtonText = 'Login';
          this.toastr.error(err[0]);
        }
      );
    }
  }
}
