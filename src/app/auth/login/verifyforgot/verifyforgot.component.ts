import { DOCUMENT } from '@angular/platform-browser';
import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CustomtoastrService } from '../../../services/customtoastr.service';
import { LocalstorageService } from '../../services/localstorage.service';
declare var $: any;

@Component({
  selector: 'app-verifyforgot',
  templateUrl: './verifyforgot.component.html',
  styleUrls: ['./verifyforgot.component.css']
})
export class VerifyforgotComponent implements OnInit {
  constructor(
    @Inject(DOCUMENT) private document: any,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private toastr: CustomtoastrService,
    private localStorageService: LocalstorageService
  ) {}

  hashToken: string;
  isVerified: Boolean = this.localStorageService.getItem('isVerified')
    ? true
    : false;
  formObj: FormGroup;
  submitButtonText: string = 'Confirm';
  submitButtonDisabled: Boolean = false;

  ngOnInit() {
    this.document.body.classList.add('be-splash-screen');
    this.route.params.subscribe(params => {
      this.hashToken = params.hashToken;
    });

    setTimeout(() => {
      $('#myModal').modal({
        backdrop: 'static',
        keyboard: false
      });
    }, 0);

    this.formObj = this.fb.group({
      otp: [
        '',
        [Validators.required, Validators.minLength(4), Validators.maxLength(6)]
      ]
    });
  }

  verify() {
    if (this.formObj && this.formObj.valid) {
      this.submitButtonText= 'Checking...';
      this.submitButtonDisabled = true;
      this.authService
        .recoverVerify(this.hashToken, this.formObj.value)
        .subscribe(
          response => {
              this.toastr.success(response.message);
            this.hashToken = response.token;
            this.isVerified = true;
            this.localStorageService.setItem('isVerified', true);
          },
          err => {
            this.submitButtonText= 'Confirm';
            this.submitButtonDisabled = false;
            this.toastr.error(err[0]);
          }
        );
    }
  }
}
