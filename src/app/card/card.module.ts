import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from '../common/material/material.module';
import { CategoryService } from '../category/services/category.service';
import { CardEditComponent } from './card-edit/card-edit.component';
import { CardAddComponent } from './card-add/card-add.component';
import { CardListComponent } from './card-list/card-list.component';
import { CardService } from './services/card.service';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: CardListComponent,
        data: {
          title: 'payment Mode List'
        }
      },
      {
        path: 'add',
        component: CardAddComponent,
        data: {
          title: 'payment mode Add' 
        }
      },
      {
        path: 'update/:cardId',
        component: CardEditComponent,
        data: {
          title: 'payment mode Edit' 
        }
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes), ReactiveFormsModule,
    FormsModule,
    MaterialModule
  ],
  declarations: [CardEditComponent, CardAddComponent, CardListComponent],
  providers: [CategoryService, CardService]
})
export class CardModule { }
