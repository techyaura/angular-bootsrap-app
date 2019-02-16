import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { StockService } from '../services/stock.service';
import { LoaderService } from '../../loader/loader.service';

@Component({
  selector: 'app-stock-edit',
  templateUrl: './stock-edit.component.html',
  styleUrls: ['./stock-edit.component.css']
})
export class StockEditComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private loaderService: LoaderService,
    private fb: FormBuilder,
    private stockService: StockService
  ) {}

  stockId: string;
  stockDetail: any;
  formObj: FormGroup;
  todaysDate = new Date();
  s_types: Array<object>;
  all_Stocks: Array<object>;

  ngOnInit() {
    this.formObj = this.fb.group(
      {
        transactionDate: [this.todaysDate, [Validators.required]],
        s_name: ['', []],
        s_Id: ['', [Validators.required]],
        s_price: ['', [Validators.required]],
        quantity: ['', [Validators.required]],
        s_type: ['BUY', [Validators.required]]
      },
      { updateOn: 'submit' }
    );

    this.route.params.subscribe(params => {
      this.stockId = params.stockId;
      this.view(this.stockId);
    });

    this.s_types = this.stockService.transactionType();
    this.listSystemStocks();
  }

  update() {
    if (this.formObj && this.formObj.valid) {
      this.loaderService.show();
      this.stockService.update(this.stockId, this.formObj.value).subscribe(
        response => {
          this.loaderService.hide();
          this.router.navigate(['/stock/list']);
        },
        err => {
          this.loaderService.hide();
        }
      );
    }
  }

  view(stockId) {
    this.loaderService.show();
    this.stockService.view(stockId).subscribe(
      response => {
        this.stockDetail = response.data;
        this.populate(this.stockDetail);
        this.loaderService.hide();
      },
      err => {
        this.loaderService.hide();
      }
    );
  }

  private populate(data) {
    this.formObj.patchValue({
      s_name: data.s_name || ''
    });
    this.formObj.patchValue({
      s_type: data.s_type || ''
    });
    this.formObj.patchValue({
      s_Id: data.s_Id || ''
    });
    this.formObj.patchValue({
      transactionDate: data.transactionDate || ''
    });
    this.formObj.patchValue({
      quantity: data.quantity || ''
    });
    this.formObj.patchValue({
      s_price: data.s_price || ''
    });
  }

  listSystemStocks() {
    this.stockService.listSystemStocks().subscribe(
      (stocks) => {
        this.all_Stocks = stocks.data;
        this.loaderService.hide();
      },
      err => {
        this.loaderService.hide();
      }
    );
  }

}
