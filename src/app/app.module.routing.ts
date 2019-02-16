import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanActivateAuthenticateGuard } from './guards/can-activate-authenticate.guard';
import { CategoryListComponent } from './category/category-list/category-list.component';
import { CategoryAddComponent } from './category/category-add/category-add.component';
import { CategoryEditComponent } from './category/category-edit/category-edit.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    canActivate: [CanActivateAuthenticateGuard],
    loadChildren: 'app/home/home.module#HomeModule'
  },
  {
    path: 'stock',
    canActivate: [CanActivateAuthenticateGuard],
    loadChildren: 'app/stock/stock.module#StockModule'
  },
  {
    path: 'auth',
    loadChildren: 'app/auth/auth.module#AuthModule'
  },
  {
    path: 'transaction',
    canActivate: [CanActivateAuthenticateGuard],
    loadChildren: 'app/payment/payment.module#PaymentModule'
  },
  {
    path: 'item',
    canActivate: [CanActivateAuthenticateGuard],
    loadChildren: 'app/item/item.module#ItemModule'
  },
  {
    path: 'card',
    canActivate: [CanActivateAuthenticateGuard],
    loadChildren: 'app/card/card.module#CardModule'
  },
  {
    path: 'category/list',
    canActivate: [CanActivateAuthenticateGuard],
    component: CategoryListComponent,
    data: {
      title: 'Category List'
    }
  },
   {
      path: 'category/add',
      canActivate: [CanActivateAuthenticateGuard],
      component: CategoryAddComponent,
      data: {
        title: 'Category Add'
      }
    },
  {
    path: 'category/update/:categoryId',
    canActivate: [CanActivateAuthenticateGuard],
    component: CategoryEditComponent,
    data: {
      title: 'Category Edit'
    }
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
