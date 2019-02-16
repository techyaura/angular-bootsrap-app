import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoryService } from '../../category/services/category.service';
import { LoaderService } from '../../loader/loader.service';
import { CustomtoastrService } from '../../services/customtoastr.service';

@Component({
  selector: 'app-category-add',
  templateUrl: '../../category/category-add/category-add.component.html'
  // styleUrls: ['./category-add.component.css']
})
export class CategoryCommonComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CategoryCommonComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private loaderService: LoaderService,
    private categoryService: CategoryService,
    private fb: FormBuilder,
    private router: Router,
    private toastr: CustomtoastrService) {

    }

  categoryArrayList = [];
  paymentModeArray = [];
  formObj: FormGroup;

  ngOnInit() {
    this.list();
    this.paymentModeArray = this.paymentMode();
    this.formObj = this.fb.group(
      {
        // mode: ['EXPENSE', [Validators.required]],
        status: [true, [Validators.required]],
        name: ['', [Validators.required]],
        parent: ['', []],
        isSystemDefined: [false, [Validators.required]]
      },
      { updateOn: 'submit' }
    );
  }

  add() {
    if (!this.formObj.value.parent) {
      delete this.formObj.value.parent;
    }
    if (this.formObj && this.formObj.valid) {
      this.loaderService.show();
      this.categoryService.add(this.formObj.value).subscribe(
        response => {
          this.loaderService.hide();
          this.dialogRef.close(response);
          // if (this.data.hasOwnProperty('screen')) {
            // this.dialogRef.close(response);
         // } else {
              // this.router.navigate(['/category/list']);
         // }
        },
        err => {
          this.toastr.error(err[0]);
          this.loaderService.hide();
        }
      );
    }
  }

  list() {
    this.categoryService.list().subscribe(response => {
      this.categoryArrayList = response.data;
      this.loaderService.hide();
    },
      err => {
        this.loaderService.hide();
      });
  }

  paymentMode() {
    return [
      {
        name: 'EXPENSE',
        value: 'EXPENSE'
      },
      {
        name: 'INCOME',
        value: 'INCOME'
      }
    ];
  }

}
