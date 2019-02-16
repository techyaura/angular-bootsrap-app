import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoryService } from '../services/category.service';
import { LoaderService } from '../../loader/loader.service';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent implements OnInit {
  constructor(
    private loaderService: LoaderService,
    private categoryService: CategoryService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  categoryId: string;
  categoryDetail: any;
  paymentModeArray = [];
  categoryArrayList = [];
  formObj: FormGroup;

  ngOnInit() {
    this.loaderService.show();
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

    this.route.params.subscribe(params => {
      this.categoryId = params.categoryId;
      this.view(this.categoryId);
    });
  }

  update() {
    if (!this.formObj.value.parent) {
      delete this.formObj.value.parent;
    }
    if (this.formObj && this.formObj.valid) {
      this.loaderService.show();
      this.categoryService
        .update(this.categoryId, this.formObj.value)
        .subscribe(
          response => {
            this.loaderService.hide();
            this.router.navigate(['/category/list']);
          },
          err => {
            this.loaderService.hide();
          }
        );
    }
  }

  private populate(data) {
    this.formObj.patchValue({
      name: data.name || ''
    });
    this.formObj.patchValue({
      mode: data.mode || ''
    });
    this.formObj.patchValue({
      parent: data.parent || ''
    });
    this.formObj.patchValue({
      status: data.status || ''
    });
  }

  list() {
    this.categoryService.list().subscribe(
      response => {
        const categoryArrayList = response.data;
        this.categoryArrayList = categoryArrayList.filter(item => {
          return item._id !== this.categoryId;
        });
        this.loaderService.hide();
      },
      err => {
        this.loaderService.hide();
      }
    );
  }

  view(categoryId) {
    this.categoryService.view(categoryId).subscribe(
      response => {
        this.categoryDetail = response.data;
        this.populate(this.categoryDetail);
        this.loaderService.hide();
      },
      err => {
        this.loaderService.hide();
      }
    );
  }

  paymentMode() {
    return [
      {
        name: 'EXPENSE',
        value: 'EXPENSE'
      },
      {
        name: 'INVESTMENT',
        value: 'INVESTMENT'
      },
      {
        name: 'INCOME',
        value: 'INCOME'
      }
    ];
  }
}
