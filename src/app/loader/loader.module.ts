import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { LoaderService } from './loader.service';
import { LoaderComponent } from './loader.component';

@NgModule({
  imports: [
    CommonModule,
    MatProgressBarModule
  ],
  providers: [LoaderService],
  declarations: [LoaderComponent],
  exports: [LoaderComponent]
})
export class LoaderModule { }
