import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {MaterialModule} from '../common/material/material.module';
import { StockAddComponent } from './stock-add/stock-add.component';
import { StockEditComponent } from './stock-edit/stock-edit.component';
import { StockListComponent } from './stock-list/stock-list.component';
import { StockService } from './services/stock.service';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: StockListComponent,
        data: {
          title: 'stock List'
        }
      },
      {
        path: 'add',
        component: StockAddComponent,
        data: {
          title: 'stock Add'
        }
      },
      {
        path: 'update/:stockId',
        component: StockEditComponent,
        data: {
          title: 'stock Edit'
        }
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    MaterialModule
  ],
  declarations: [StockAddComponent, StockEditComponent, StockListComponent],
  providers: [StockService]
})
export class StockModule { }
