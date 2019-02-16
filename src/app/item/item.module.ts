import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ItemService } from './services/item.service';
import { ItemListComponent } from './item-list/item-list.component';
import { ItemEditComponent } from './item-edit/item-edit.component';
import { ItemAddComponent } from './item-add/item-add.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: ItemListComponent,
        data: {
          title: 'Item List'
        }
      },
      {
        path: 'add',
        component: ItemAddComponent,
        data: {
          title: 'Item Add' 
        }
      },
      {
        path: "update/:itemId",
        component: ItemEditComponent,
        data: {
          title: "Item Edit" 
        }
      }
    ]
  }
];


@NgModule({
  imports: [
    CommonModule, RouterModule.forChild(routes), HttpClientModule, ReactiveFormsModule,
    FormsModule
  ],
  declarations: [ItemListComponent, ItemEditComponent, ItemAddComponent],
  providers: [ItemService]

})
export class ItemModule { }
