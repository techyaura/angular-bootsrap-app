import { DOCUMENT } from '@angular/platform-browser';
import { Inject } from '@angular/core';
import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CustomtoastrService } from '../../../services/customtoastr.service';
import { LocalstorageService } from '../../services/localstorage.service';
declare var $: any;

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {
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

  formObj: FormGroup;
  submitButtonText: String = 'Reset';
  submitButtonDisabled: Boolean = false;

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.hashToken = params.hashToken;
    });

    this.formObj = this.fb.group({
      password: [
        '',
        [Validators.required, Validators.minLength(6), Validators.maxLength(12)]
      ]
    });
  }

  reset() {
    if (this.formObj && this.formObj.valid) {
      this.submitButtonText = 'Resetting...';
      this.submitButtonDisabled = true;
      this.authService.reset(this.hashToken, this.formObj.value).subscribe(
        response => {
          $('#myModal').hide();
          $('.modal-backdrop').hide();
          this.toastr.success(response.message);
          this.localStorageService.removeItem('isVerified');
          this.router
            .navigate(['/auth/login']);
        },
        err => {
        this.submitButtonText = 'Reset';
        this.submitButtonDisabled = false;
         this.toastr.error(err[0]);
        }
      );
    }
  }
}
