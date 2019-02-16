import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';
import { ServiceWorkerModule } from '@angular/service-worker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app.module.routing';
import { ToastrModule } from 'ngx-toastr';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ValidateResponseInterceptor } from './interceptors/validate-response.interceptor';
import { CanActivateAuthenticateGuard } from './guards/can-activate-authenticate.guard';
import { HttpErrorHandler } from './http-error-handler.service';
import { AppComponent } from './app.component';
import { AppService } from './app.service';
import { LoaderModule } from './loader/loader.module';
import { CategoryModule } from './category/category.module';
import { ConfirmComponent } from './common/confirm/confirm.component';
import { MessageService } from './message.service';
import { environment } from '../environments/environment';
import { CustomtoastrService } from './services/customtoastr.service';
import {CategoryCommonComponent} from './common/category/category.common';
import { StockModule } from './stock/stock.module';

@NgModule({
  declarations: [AppComponent, ConfirmComponent, CategoryCommonComponent],
  imports: [
    ReactiveFormsModule, FormsModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    LoaderModule,
    CategoryModule,
    OverlayModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      preventDuplicates: true
    }),
    ServiceWorkerModule.register('/ngsw-worker.js', {
      enabled: environment.production
    }),
    StockModule
  ],
  providers: [
    AppService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ValidateResponseInterceptor,
      multi: true
    },
    CanActivateAuthenticateGuard,
    HttpErrorHandler,
    MessageService,
    CustomtoastrService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    ConfirmComponent,
    CategoryCommonComponent
]
})
export class AppModule {}
