import { DOCUMENT } from '@angular/platform-browser';
import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CustomtoastrService } from '../../../services/customtoastr.service';
import { LocalstorageService } from '../../services/localstorage.service';
import { DataexchangeService } from '../../services/dataexchange.service';
declare var $: any;

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.css']
})
export class VerificationComponent implements OnInit {
  hashToken: string;
  submitButtonText: String = 'Submit';
  submitButtonDisabled: Boolean = false;

  constructor(
    @Inject(DOCUMENT) private document: any,
    private dataService: DataexchangeService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private toastr: CustomtoastrService,
    private localStorageService: LocalstorageService
  ) {}

  formObj: FormGroup;

  ngOnInit() {
    this.document.body.classList.add('be-splash-screen');
    this.route.params.subscribe(params => {
      this.hashToken = params.hashToken;
    });

    this.formObj = this.fb.group({
      otp: [
        '',
        [Validators.required, Validators.minLength(4), Validators.maxLength(6)]
      ]
    });
  }

  verify() {
    if (this.formObj && this.formObj.valid) {
      this.submitButtonText = 'Submitting...';
      this.submitButtonDisabled = true;
      this.authService.verify(this.hashToken, this.formObj.value).subscribe(
        response => {
          this.toastr.success(response.message);
          this.document.body.classList.remove('be-splash-screen');
          this.router.navigate(['/auth/login']);
        },
        err => {
          this.toastr.error(err[0]);
          this.submitButtonDisabled = false;
          this.submitButtonText = 'Submit';
        }
      );
    }
  }
}
