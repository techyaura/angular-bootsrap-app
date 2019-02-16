import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { StockService } from '../services/stock.service';
import { LoaderService } from '../../loader/loader.service';

@Component({
  selector: 'app-stock-add',
  templateUrl: './stock-add.component.html',
  styleUrls: ['./stock-add.component.css']
})
export class StockAddComponent implements OnInit {

  constructor(
    private loaderService: LoaderService,
    private fb: FormBuilder,
    private router: Router,
    private stockService: StockService
  ) {}

  formObj: FormGroup;
  todaysDate = new Date();
  s_types: Array<object>;
  all_Stocks: Array<object>;

  ngOnInit() {
    this.formObj = this.fb.group(
      {
        transactionDate: [this.todaysDate, [Validators.required]],
        s_name: ['TRADE-', []],
        s_Id: ['', [Validators.required]],
        s_price: ['', [Validators.required]],
        quantity: ['', [Validators.required]],
        s_type: ['BUY', [Validators.required]]
      },
      { updateOn: 'submit' }
    );
    this.s_types = this.stockService.transactionType();
    this.listSystemStocks();
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

  add() {
    if (this.formObj && this.formObj.valid) {
      this.loaderService.show();
      this.stockService.add(this.formObj.value).subscribe(
        () => {
          this.loaderService.hide();
          this.router.navigate(['/stock/list']);
        },
        err => {
          this.loaderService.hide();
        }
      );
    }
  }

}
