import { DOCUMENT } from '@angular/platform-browser';
import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CustomtoastrService } from '../../services/customtoastr.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
declare var $: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  isAccess = false;
  hashToken: string;
  isSubmitDisabled: Boolean = false;
  returnUrl: string;
  loginButtonText: String = 'Register';
  loginButtonDisabled: Boolean = false;

  constructor(
    @Inject(DOCUMENT) private document: any,
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private toastr: CustomtoastrService,
    private fb: FormBuilder
  ) {}

  formObj: FormGroup;

  ngOnInit() {
    this.document.body.classList.add('be-splash-screen');
    if (this.authService.isLoggedIn()) {
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
      this.router.navigateByUrl(this.returnUrl);
    }

    this.formObj = this.fb.group({
      email: [''],
      password: ['', [Validators.maxLength(20)]],
      // role: ['CUSTOMER', [Validators.required]]
    });
  }

  register() {
    this.isAccess = true;
    if (this.formObj && this.formObj.valid) {
      this.loginButtonDisabled = true;
    this.loginButtonText = 'Registering In ...';
      // this.isSubmitDisabled = true;
      this.authService.register(this.formObj.value).subscribe(
        response => {
          this.document.body.classList.remove('be-splash-screen');
          this.toastr.success(response.message);
          this.hashToken = response.token;
          this.router.navigate([
            '/auth/verify-email/' + this.hashToken
          ]);
        },
        (err) => {
          this.toastr.error(err[0]);
          this.loginButtonDisabled = false;
          this.loginButtonText = 'Register';
        }
      )
    }
  }
}
