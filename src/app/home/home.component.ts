import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BaseChartDirective } from 'ng2-charts';
import { LoaderService } from '../loader/loader.service';
import { PaymentService } from '../payment/services/payment.service';
import { AppService } from '../app.service';
declare var Chart;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  chart_month_byDay = {};
  chart_month_byCategory1 = {};
  chart_month_byCategory2 = {};
  chart_month_byMode = {};
  chart_year_byMonth: any;
  chart_year_byMonth2: any;
  chart_year_byCategory: any;
  isExpensePerMonthInYear: Boolean = false;
  isExpensePerCategoryInMonthLoaded: Boolean = false;
  isExpensePerModeInMonthLoaded: Boolean = false;
  isExpensePerDayInMonthLoaded: Boolean = false;
  isExpensePerCategoryInYearLoaded: Boolean = false;
  formObj: FormGroup;
  monthArrayList = [];
  yearArrayList = [];
  private todayDate = new Date();
  currentMonth = this.todayDate.getMonth() + 1;
  currentYear = this.todayDate.getFullYear();
  currentMonthName: String = '';

  @ViewChild(BaseChartDirective) public chart: BaseChartDirective;

  constructor(
    private appService: AppService,
    private fb: FormBuilder,
    private loaderService: LoaderService,
    private paymentService: PaymentService
  ) {}

  ngOnInit() {
    this.currentMonthName = this.monthNames()[this.currentMonth - 1].name;
    this.formObj = this.fb.group(
      {
        month: [this.currentMonth, []],
        year: [this.currentYear, []]
      },
      { updateOn: 'submit' }
    );
    if (!this.appService.isLoggedIn()) {
      return false;
    }
    this.loaderService.show();
    this.monthArrayList = this.monthNames();
    this.yearArrayList = this.yearNames();
    // this.onChanges();
  }

  ngAfterViewInit(): void {
    this.initCharts();
  }

  private monthNames() {
    return this.paymentService.monthArr();
  }

  private yearNames() {
    return this.paymentService.yearArr();
  }

  // private onChanges(): void {
  //   this.formObj.get('month').valueChanges.subscribe(month => {
  //     this.currentMonthName = this.monthNames()[month - 1].name;
  //     this.initCharts(month);
  //     return;
  //   });
  //   this.formObj.get('year').valueChanges.subscribe(year => {
  //     this.currentYear = year;
  //     this.initCharts(this.currentMonth, year);
  //     return;
  //   });
  // }

  private initCharts(month = this.currentMonth, year = this.currentYear) {
    this.list(month, year);
  }

  private year_byMonth(pattern) {
    const lineArr = {};
    lineArr['labels'] = [];
    lineArr['expenses'] = [];
    lineArr['income'] = [];
    pattern.forEach(data1 => {
      lineArr['labels'].push(this.monthNames()[data1._id - 1].name);
      const payments = data1.payments;
      const length = payments.length;
      payments.forEach(data2 => {
        if (data2.mode === 'INCOME') {
          lineArr['income'].push(data2.totalAmount);
        }
        if (data2.mode === 'EXPENSE') {
          lineArr['expenses'].push(data2.totalAmount);
        }
        if (length === 1) {
          lineArr['income'].push(0);
        }
      });
    });
    lineArr['lineChartOptions'] = {
      responsive: true
    };
    lineArr['lineChartLegend'] = true;
    lineArr['lineChartType'] = 'line';
    lineArr['lineChartColors'] = [
      {
        // grey
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)'
      },
      {
        // dark grey
        backgroundColor: 'rgba(77,83,96,0.2)',
        borderColor: 'rgba(77,83,96,1)',
        pointBackgroundColor: 'rgba(77,83,96,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(77,83,96,1)'
      }
    ];
    lineArr['lineChartData'] = [
      {
        data: lineArr['income'],
        label: 'INCOME'
      },
      {
        data: lineArr['expenses'],
        label: 'Expense'
      }
    ];
    return Promise.resolve(lineArr);
  }

  private year_byMonth2(pattern) {
    const finalArr = {};
    const __localChartArray3 = [];
    finalArr['barChartLabels'] = [];
    pattern.forEach(data => {
      finalArr['barChartLabels'].push(this.monthNames()[data._id - 1].name);
      __localChartArray3.push(data.totalAmount);
    });
    finalArr['barChartData'] = [
      {
        data: __localChartArray3,
        label: 'Expense'
      }
    ];
    finalArr['barChartType'] = 'bar';
    finalArr['barChartLegend'] = true;
    finalArr['barChartOptions'] = {
      scaleShowVerticalLines: false,
      responsive: true
    };
    return Promise.resolve(finalArr);
  }

  private list(month = this.currentMonth, year = this.currentYear) {
    this.isExpensePerMonthInYear = false;
    this.isExpensePerCategoryInMonthLoaded = false;
    this.isExpensePerModeInMonthLoaded = false;
    this.isExpensePerDayInMonthLoaded = false;
    this.isExpensePerCategoryInYearLoaded = false;
    this.expensePerCategoryInMonth(month, year);
    this.expensePerModeInMonth(month, year);
    this.expensePerDayInMonth(month, year);
    this.expensePerCategoryInYear(month, year);
    this.expensePerMonthInYear(month, year);
  }

  public changFilter($event, flag) {
    if (flag === 'month') {
      this.currentMonth = $event.target.value;
      this.initCharts(this.currentMonth, this.currentYear);
      return false;
    }
    if (flag === 'year') {
      this.currentYear = $event.target.value;
      this.initCharts(this.currentMonth, this.currentYear);
      return;
    }
  }

  private expensePerCategoryInMonth(month, year) {
    this.paymentService.expensePerCategoryInMonth(month, year).subscribe(
      response => {
        const pattern = response.data;
        const localChartArray = [];
        this.chart_month_byCategory1['barChartLabels'] = [];
        this.chart_month_byCategory2['barChartType'] = 'pie';
        this.chart_month_byCategory2['barChartData'] = [];
        this.chart_month_byCategory2['barChartLabels'] = [];
        pattern.forEach(data => {
          this.chart_month_byCategory1['barChartLabels'].push(data.category[0]);
          this.chart_month_byCategory2['barChartLabels'].push(data.category[0]);
          this.chart_month_byCategory2['barChartData'].push(data.totalAmount);
          localChartArray.push(data.totalAmount);
        });
        this.chart_month_byCategory1['barChartData'] = [
          {
            data: localChartArray,
            label: 'Expense'
          }
        ];
        this.chart_month_byCategory1['barChartType'] = 'bar';
        this.chart_month_byCategory1['barChartLegend'] = true;
        this.chart_month_byCategory1['barChartOptions'] = {
          scaleShowVerticalLines: false,
          responsive: true,
          // maintainAspectRatio: false
        };
        this.isExpensePerCategoryInMonthLoaded = true;
        this.loaderService.hide();
      },
      () => {
        this.loaderService.hide();
      }
    );
  }

  private expensePerModeInMonth(month, year) {
    this.paymentService.expensePerModeInMonth(month, year).subscribe(
      response => {
        const pattern = response.data;
        const finalArr = [];
        finalArr['barChartLabels'] = [];
        finalArr['barChartData'] = [];
        pattern.forEach(data => {
          finalArr['barChartLabels'].push(data.mode);
          finalArr['barChartData'].push(data.totalAmount);
        });
        finalArr['barChartType'] = 'pie';
        this.chart_month_byMode = finalArr;
        this.isExpensePerModeInMonthLoaded = true;
        this.loaderService.hide();
      },
      () => {
        this.loaderService.hide();
      }
    );
  }

  private expensePerDayInMonth(month, year) {
    this.paymentService.expensePerDayInMonth(month, year).subscribe(
      response => {
        const pattern = response.data;
        const finalArray = {};
        const __localChartArray = [];
        finalArray['barChartLabels'] = [];
        pattern.forEach(data => {
          finalArray['barChartLabels'].push(
            data._id + ' ' + this.monthNames()[data.month - 1].name
          );
          __localChartArray.push(data.totalAmount);
        });
        finalArray['barChartData'] = [
          {
            data: __localChartArray,
            label: 'Expense'
          }
        ];
        finalArray['barChartType'] = 'bar';
        finalArray['barChartLegend'] = true;
        finalArray['barChartOptions'] = {
          scaleShowVerticalLines: false,
          responsive: true
        };
        this.chart_month_byDay = finalArray;
        this.isExpensePerDayInMonthLoaded = true;
        this.loaderService.hide();
      },
      () => {
        this.loaderService.hide();
      }
    );
  }

  private expensePerCategoryInYear(month, year) {
    this.paymentService.expensePerCategoryInYear(month, year).subscribe(
      response => {
        const pattern = response.data;
        this.chart_year_byCategory = pattern;
        this.isExpensePerCategoryInYearLoaded = true;
        this.loaderService.hide();
      },
      () => {
        this.loaderService.hide();
      }
    );
  }

  private expensePerMonthInYear(month, year) {
    this.paymentService.expensePerMonthInYear(month, year).subscribe(
      response => {
        const pattern = response.data;
        const aggregate = Promise.all([this.year_byMonth(pattern), this.year_byMonth2(pattern)]);
        aggregate.then(result => {
          this.chart_year_byMonth = result[0];
          this.chart_year_byMonth2 = result[1];
          this.isExpensePerMonthInYear = true;
          this.loaderService.hide();
        });
      },
      () => {
        this.loaderService.hide();
      }
    );
  }
}
