import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { PaymentService } from '../services/payment.service';
import { CardService } from '../../card/services/card.service';
import { CategoryService } from '../../category/services/category.service';
import { LoaderService } from '../../loader/loader.service';
import { NativeDateAdapter } from '@angular/material';
import {CategoryCommonComponent} from '../../common/category/category.common';

@Component({
  selector: 'app-payment-add',
  templateUrl: './payment-add.component.html',
  styleUrls: ['./payment-add.component.css']
})
export class PaymentAddComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    private cardService: CardService,
    private loaderService: LoaderService,
    private paymentService: PaymentService,
    private fb: FormBuilder,
    private router: Router,
    private categoryService: CategoryService
  ) {}

  categoryArrayList = [];
  cardArrayList = [];
  paymentModeArray = [];
  formObj: FormGroup;
  todaysDate = new Date();
  // todaysDateStr = this.getFormattedDate(this.todaysDate);
  todaysDateStr = new Date();

  ngOnInit() {
    this.paymentModeArray = this.paymentMode();
    this.formObj = this.fb.group(
      {
        paymentDate: [this.todaysDateStr, [Validators.required]],
        name: [''],
        transactionId: ['', []],
        amount: ['', [Validators.required]],
        categoryId: ['', [Validators.required]],
        cardId: ['', [Validators.required]],
        mode: ['EXPENSE', [Validators.required]]
      },
      { updateOn: 'submit' }
    );
    this.list();
    this.getCards();
    // this.onChanges();
  }

  getFormattedDate(date) {
    const year = date.getFullYear();

    let month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;

    let day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;

    return day + '/' + month + '/' + year;
  }

  add() {
    if (!this.formObj.value.parent) {
      delete this.formObj.value.parent;
    }
    if (this.formObj && this.formObj.valid) {
      this.loaderService.show();
      this.paymentService.add(this.formObj.value).subscribe(
        () => {
          this.loaderService.hide();
          this.router.navigate(['/transaction/list']);
        },
        err => {
          this.loaderService.hide();
        }
      );
    }
  }

  list(mode = 'ALL') {
    this.categoryService.list(mode).subscribe(
      response => {
        this.categoryArrayList = response.data;
        this.loaderService.hide();
      },
      err => {
        this.loaderService.hide();
      }
    );
  }

  getCards(mode = 'ALL') {
    this.cardService.list(mode).subscribe(
      response => {
        this.cardArrayList = response.data;
        this.loaderService.hide();
      },
      err => {
        this.loaderService.hide();
      }
    );
  }

  // onChanges(): void {
  //   this.formObj.get('mode').valueChanges.subscribe(val => {
  //     this.loaderService.show();
  //     this.list(val);
  //   });
  // }

  paymentMode() {
    return [
      {
        name: 'DEBIT',
        value: 'EXPENSE'
      },
      {
        name: 'CREDIT',
        value: 'INCOME'
      }
    ];
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CategoryCommonComponent, {
      width: '500px',
      data : {'screen': 'payment-add'}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      this.list();
    });
  }
}

// @Component({
//   selector: 'app-category-add',
//   templateUrl: '../../category/category-add/category-add.component.html',
// })
// export class DialogOverviewExampleDialog {

//   constructor(
//     public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
//     @Inject(MAT_DIALOG_DATA) public data: any) { }

//   onNoClick(): void {
//     this.dialogRef.close();
//   }

// }
