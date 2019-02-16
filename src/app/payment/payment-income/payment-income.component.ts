import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { LoaderService } from '../../loader/loader.service';
import { PaymentService } from '../services/payment.service';
import { CategoryService } from '../../category/services/category.service';

@Component({
  selector: 'app-payment-income',
  templateUrl: './payment-income.component.html',
  styleUrls: ['./payment-income.component.css']
})
export class PaymentIncomeComponent implements OnInit {

  formObj: FormGroup;
  dataArrayList = [];
  isApiLoaded = false;
  categoryArrayList = [];

  constructor(private fb: FormBuilder, private loaderService: LoaderService, private paymentService: PaymentService, private categoryService: CategoryService) { }

  ngOnInit() {
    this.loaderService.show();
    this.formObj = this.fb.group(
      {
        category: ['', []]
      }
    );
    this.list();
    this.list_category();
    this.__onChanges();
  }

  list(q = 'all', ct = 'all', mode = 'INCOME') {
    this.paymentService.list(q, ct, mode).subscribe(response => {
      this.dataArrayList = response.data;
      this.loaderService.hide();
      this.isApiLoaded = true;
    },
      err => {
        this.loaderService.hide();
      });
  }

  remove(categoryId) {
    this.loaderService.show();
    this.paymentService.remove(categoryId).subscribe(
      response => {
        this.list();
      },
      err => {
        this.loaderService.hide();
      });
  }


  list_category(mode = "INCOME") {
    this.categoryService.list(mode).subscribe(response => {
      this.categoryArrayList = response.data;
      this.loaderService.hide();
    },
      err => {
        this.loaderService.hide();
      });
  }

  __onChanges(): void {
    this.formObj.get("category").valueChanges.subscribe(category => {
      this.list('all', category, 'all');
      return;
    });
  }

}
