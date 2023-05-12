import { NgModule } from '@angular/core';
import { AkaScrollResetDirective } from '@aka/directives/scroll-reset/scroll-reset.directive';

@NgModule({
  declarations: [AkaScrollResetDirective],
  exports: [AkaScrollResetDirective],
})
export class AkaScrollResetModule {}
