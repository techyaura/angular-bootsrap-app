import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { PaymentService } from '../services/payment.service';
import { CategoryService } from '../../category/services/category.service';
import { CardService } from '../../card/services/card.service';
import { LoaderService } from '../../loader/loader.service';
import { NativeDateAdapter } from '@angular/material';
import { CategoryAddComponent } from '../../category/category-add/category-add.component';
@Component({
  selector: 'app-payment-edit',
  templateUrl: './payment-edit.component.html',
  styleUrls: ['./payment-edit.component.css']
})
export class PaymentEditComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    private cardService: CardService,
    private loaderService: LoaderService,
    private paymentService: PaymentService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService
  ) {}

  paymentId: string;
  paymentDetail: any;
  categoryArrayList = [];
  paymentModeArray = [];
  formObj: FormGroup;
  cardArrayList = [];

  ngOnInit() {
    this.paymentModeArray = this.paymentMode();
    this.formObj = this.fb.group(
      {
        name: ['', []],
        mode: ['EXPENSE', [Validators.required]],
        categoryId: ['', [Validators.required]],
        cardId: ['', [Validators.required]],
        amount: ['', [Validators.required]],
        paymentDate: [true, [Validators.required]],
        transactionId: ['', []]
      },
      { updateOn: 'submit' }
    );

    this.route.params.subscribe(params => {
      this.paymentId = params.paymentId;
      this.view(this.paymentId);
    });
    this.list();
    this.getCards();
    // this.onChanges();
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
          this.router.navigate(['/payment/list']);
        },
        err => {
          this.loaderService.hide();
        }
      );
    }
  }

  update() {
    if (!this.formObj.value.parent) {
      delete this.formObj.value.parent;
    }
    if (this.formObj && this.formObj.valid) {
      this.loaderService.show();
      this.paymentService.update(this.paymentId, this.formObj.value).subscribe(
        response => {
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
    this.loaderService.show();
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
  //     this.list(val);
  //   });
  // }

  private populate(data) {
    this.formObj.patchValue({
      name: data.name || ''
    });
    this.formObj.patchValue({
      mode: data.mode || ''
    });
    this.formObj.patchValue({
      categoryId: data.categoryId || ''
    });
    this.formObj.patchValue({
      cardId: data.cardId || ''
    });
    this.formObj.patchValue({
      amount: data.amount || ''
    });
    this.formObj.patchValue({
      paymentDate: data.paymentDate || ''
    });
  }

  view(paymentId) {
    this.loaderService.show();
    this.paymentService.view(paymentId).subscribe(
      response => {
        this.paymentDetail = response.data;
        this.populate(this.paymentDetail);
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
    const dialogRef = this.dialog.open(CategoryAddComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      this.list();
    });
  }
}
