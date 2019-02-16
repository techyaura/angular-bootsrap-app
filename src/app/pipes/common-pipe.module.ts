import { NgModule } from '@angular/core';
import {CategoryAncestorPipe } from './category-ancestor.pipe';
@NgModule({
  declarations: [CategoryAncestorPipe],
  exports: [
    CategoryAncestorPipe
  ]
})
export class CommonPipeModule {

static forRoot() {
   return {
       ngModule: CommonPipeModule,
       providers: [],
   };
}
}