import { Component, OnInit, ViewChild } from '@angular/core';
import { LoaderService } from '../../loader/loader.service';
import { CardService } from '../services/card.service';
import {MatSort, MatPaginator, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css']
})
export class CardListComponent implements OnInit {

  dataArrayList = [];
  isApiLoaded = false;
  categoryArrayList = [];
  displayedColumns: string[] = ['index', 'name', 'createdDate', 'actions'];
  dataSource: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor( private loaderService: LoaderService, private cardService: CardService) { }

  ngOnInit() {
    this.loaderService.show();
    this.list();
  }

  list(q = 'all', ct = 'all', mode = 'EXPENSE') {
    this.cardService.list(q, ct, mode).subscribe(response => {
      // this.dataArrayList = response.data;
      this.dataSource = new MatTableDataSource(response.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.loaderService.hide();
      this.isApiLoaded = true;
    },
      () => {
        this.loaderService.hide();
      });
  }

  remove(cardId) {
    this.loaderService.show();
    this.cardService.remove(cardId).subscribe(
      () => {
        this.list();
      },
      () => {
        this.loaderService.hide();
      });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
