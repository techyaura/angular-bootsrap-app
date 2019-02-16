import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CustomtoastrService } from '../../services/customtoastr.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoaderService } from '../../loader/loader.service';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {
  userInfo: any;
  formObj: FormGroup;
  hideProfile: Boolean = true;
  constructor(
    private loaderService: LoaderService,
    private fb: FormBuilder,
    private authService: AuthService,
    private toastr: CustomtoastrService
  ) {}

  ngOnInit() {
    this.getProfile();
    this.formObj = this.fb.group(
      {
        firstname: ['', [Validators.required]],
        lastname: ['', [Validators.required]],
        email: ['', [Validators.required]]
      },
      { updateOn: 'submit' }
    );
  }

  getProfile() {
    this.authService.sessionUser().subscribe(
      response => {
        this.userInfo = response.data;
        this.populate(this.userInfo);
      },
      err => {
        this.toastr.error(err[0]);
      }
    );
  }

  private populate(data) {
    this.formObj.patchValue({
      firstname: data.firstname || ''
    });
    this.formObj.patchValue({
      lastname: data.lastname || ''
    });
    this.formObj.patchValue({
      email: data.email || ''
    });
  }

  update() {
    if (this.formObj && this.formObj.valid) {
      this.loaderService.show();
      this.authService.update(this.formObj.value).subscribe(
        response => {
          this.hideProfile = true;
          this.loaderService.hide();
          // this.router.navigate(['/stock/list']);
        },
        err => {
          this.loaderService.hide();
        }
      );
    }
  }

  showEditMode() {
    this.hideProfile = false;
  }
}
