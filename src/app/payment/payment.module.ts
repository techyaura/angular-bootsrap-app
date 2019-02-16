import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PaymentListComponent } from './payment-list/payment-list.component';
import { PaymentAddComponent } from './payment-add/payment-add.component';
import { PaymentEditComponent } from './payment-edit/payment-edit.component';
import { PaymentViewComponent } from './payment-view/payment-view.component';
import { PaymentService } from './services/payment.service';
import { CategoryService } from '../category/services/category.service';
import { CardService } from '../card/services/card.service';
import { PaymentTimelineComponent } from './payment-timeline/payment-timeline.component';
import { GetMonthNamePipe } from './pipes/get-month-name.pipe';
import { SortByDatePipe } from '../pipes/sort-by-date.pipe';
import { PaymentIncomeComponent } from './payment-income/payment-income.component';
import {MaterialModule} from '../common/material/material.module';
import { CommonPipeModule } from '../pipes/common-pipe.module';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: PaymentListComponent,
        data: {
          title: 'payment List'
        }
      },
      {
        path: 'add',
        component: PaymentAddComponent,
        data: {
          title: 'payment Add'
        }
      },
      {
        path: 'update/:paymentId',
        component: PaymentEditComponent,
        data: {
          title: 'payment Edit'
        }
      },
      {
        path: 'timeline',
        component: PaymentTimelineComponent,
        data: {
          title: 'payment Timeline'
        }
      },
      {
        path: 'income',
        component: PaymentIncomeComponent,
        data: {
          title: 'payment Income'
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
    MaterialModule,
    CommonPipeModule.forRoot()
  ],
  declarations: [
    PaymentListComponent,
    PaymentAddComponent,
    PaymentEditComponent,
    PaymentViewComponent,
    PaymentTimelineComponent,
    GetMonthNamePipe,
    SortByDatePipe,
    PaymentIncomeComponent
  ],
  providers: [PaymentService, CategoryService, CardService],
  exports: []
  // entryComponents: [CategoryAddComponent]
})
export class PaymentModule {}
