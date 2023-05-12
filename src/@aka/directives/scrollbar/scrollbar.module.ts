import { NgModule } from '@angular/core';
import { AkaScrollbarDirective } from '@aka/directives/scrollbar/scrollbar.directive';

@NgModule({
  declarations: [AkaScrollbarDirective],
  exports: [AkaScrollbarDirective],
})
export class AkaScrollbarModule {}
