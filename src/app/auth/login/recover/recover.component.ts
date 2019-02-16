import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CustomtoastrService } from '../../../services/customtoastr.service';

@Component({
  selector: 'app-recover',
  templateUrl: './recover.component.html',
  styleUrls: ['./recover.component.css']
})
export class RecoverComponent implements OnInit {
  @Input() isChecked: Boolean = false;

  hashToken: string;
  submitButtonText: string = 'Send Recovery Email';
  submitButtonDisabled: Boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private toastr: CustomtoastrService
  ) {}

  formObj: FormGroup;

  ngOnInit() {
    this.formObj = this.fb.group(
      {
        // email: ['', [Validators.required, Validators.email]]
        email: ['']
      },
      { updateOn: 'submit' }
    );
  }

  forgot() {
    if (this.formObj && this.formObj.valid) {
      this.submitButtonDisabled = true;
      this.submitButtonText = 'Sending...';
      this.authService.recover(this.formObj.value).subscribe(
        response => {
          this.submitButtonText = 'Send Recovery Email';
          this.submitButtonDisabled = false;
          this.toastr.success(response.message);
          this.hashToken = response.token;
          this.router.navigate(['/auth/verify-forgot', this.hashToken]);
        },
        err => {
          this.submitButtonDisabled = false;
          this.submitButtonText = 'Send Recovery Email';
          this.toastr.error(err[0]);
        }
      );
    }
  }
}
