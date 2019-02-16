import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { LoaderService } from '../../loader/loader.service';
import { StockService } from '../services/stock.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { ConfirmComponent } from '../../common/confirm/confirm.component';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.css']
})
export class StockListComponent implements OnInit {

  // formObj: FormGroup;
  dataArrayList = [];
  isApiLoaded = false;
  constructor(
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    // private fb: FormBuilder,
    private loaderService: LoaderService,
    private stockService: StockService,
  ) { }

  ngOnInit() {
    this.loaderService.show();
    // this.formObj = this.fb.group(
    //   {
    //     category: ['', []]
    //   }
    // );
    // this.activatedRoute.queryParams.subscribe((params: Params) => {
    //   this.slug = params['ctId'];
    //   this.formObj.patchValue({
    //     category: this.slug || ''
    //   });
    // });

    this.list();
  }

  openDialog(stockId): void {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '250px',
      data: {service: this.stockService, dataId: stockId}
    });

    dialogRef.afterClosed().subscribe(
      result => {
        this.list();
      },
      err => {
        this.loaderService.hide();
      }
    );
  }

  list(q = 'all') {
    this.stockService.list(q).subscribe(response => {
      this.dataArrayList = response.data;
      this.loaderService.hide();
      this.isApiLoaded = true;
    },
      err => {
        this.loaderService.hide();
      });
  }

}
