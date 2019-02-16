import { Component, OnInit, ViewChild } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { LoaderService } from '../../loader/loader.service';
import {MatSort, MatPaginator, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  constructor(private loaderService: LoaderService, private categoryService: CategoryService) { }

  categoryArrayList = [];
  isDataLoaded: Boolean = false;
  displayedColumns: string[] = ['index', 'category', 'parentCategory', 'actions'];
  dataSource: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.loaderService.show();
    this.list();
  }

  list() {
    this.categoryService.list().subscribe(response => {
      // this.categoryArrayList = response.data;
      this.loaderService.hide();
      this.isDataLoaded = true;
      this.dataSource = new MatTableDataSource(response.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    },
      () => {
        this.loaderService.hide();
        this.isDataLoaded = true;
      });
  }

  remove(categoryId) {
    this.loaderService.show();
    this.categoryService.remove(categoryId).subscribe(
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
