import { Component, OnInit, ViewChild } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { LoaderService } from '../../loader/loader.service';
import { PaymentService } from '../services/payment.service';
import { CategoryService } from '../../category/services/category.service';
import { ConfirmComponent } from '../../common/confirm/confirm.component';
import { distinctUntilChanged } from 'rxjs/operators';
import {MatSort, MatPaginator, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.css']
})
export class PaymentListComponent implements OnInit {
  formObj: FormGroup;
  dataArrayList = [];
  isApiLoaded = false;
  categoryArrayList = [];
  slug = '';
  displayedColumns: string[] = ['index', 'category', 'description', 'paymentDate', 'amount', 'actions'];
  dataSource: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private loaderService: LoaderService,
    private paymentService: PaymentService,
    private categoryService: CategoryService) { }

  ngOnInit() {
    this.loaderService.show();
    this.formObj = this.fb.group(
      {
        category: ['', []]
      }
    );
    this.list_category();
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.slug = params['ctId'] || params['category'];
      this.formObj.patchValue({
        category: this.slug === 'all' ? '' : this.slug
      });
      this.list('all', this.slug);
    });
    this.__onChanges();
  }

  appendQueryStr(queryObj) {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: queryObj,
      queryParamsHandling: 'merge',
      // preserve the existing query params in the route
      skipLocationChange: true
      // do not trigger navigation
    });
  }

  openDialog(categoryId): void {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '250px',
      data: {service: this.paymentService, dataId: categoryId}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.list();
    });
  }

  list(q = 'all', ct = 'all', mode = 'all') {
    if (ct === '') {
        ct = 'all';
    }
    this.appendQueryStr({'category': ct});
    this.paymentService.list(q, ct, mode).subscribe(response => {
      // this.dataArrayList = response.data;
      this.dataSource = new MatTableDataSource(response.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
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


  list_category(mode = 'ALL') {
    this.categoryService.list(mode).subscribe(response => {
      this.categoryArrayList = response.data;
      this.loaderService.hide();
    },
      err => {
        this.loaderService.hide();
      });
  }

  __onChanges(): void {
    this.formObj.controls['category'].valueChanges.pipe(distinctUntilChanged((a, b) => this.jsonEqual(a, b)))
    .subscribe(category => {
      this.list('all', category, 'all');
    });
  }
    jsonEqual(a, b): boolean {
      return JSON.stringify(a) === JSON.stringify(b);
    }

    applyFilter(filterValue: string) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }

}
