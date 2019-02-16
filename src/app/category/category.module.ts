import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CategoryService } from './services/category.service';
import { AncestorsPipe } from './pipes/ancestors.pipe';
import { CategoryAddComponent } from './category-add/category-add.component';
import { CategoryEditComponent } from './category-edit/category-edit.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { MaterialModule } from '../common/material/material.module';

// const routes: Routes = [
//   {
//     path: '',
//     children: [
//       {
//         path: 'list',
//         component: CategoryListComponent,
//         data: {
//           title: 'Category List'
//         }
//       },
//       {
//         path: 'add',
//         component: CategoryAddComponent,
//         data: {
//           title: 'Category Add'
//         }
//       },
//       {
//         path: 'update/:categoryId',
//         component: CategoryEditComponent,
//         data: {
//           title: 'Category Edit'
//         }
//       }
//     ]
//   }
// ];

// @NgModule({
//   imports: [CommonModule, RouterModule.forChild(routes), ReactiveFormsModule,
//     FormsModule],
//   declarations: [CategoryAddComponent, CategoryEditComponent, CategoryListComponent, AncestorsPipe],
//   providers: [CategoryService],
//   exports: []
// })
@NgModule({
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule, MaterialModule],
  declarations: [
    CategoryAddComponent,
    CategoryEditComponent,
    CategoryListComponent,
    AncestorsPipe
  ],
  providers: [CategoryService],
  exports: [CategoryAddComponent, AncestorsPipe]
})
export class CategoryModule {}
