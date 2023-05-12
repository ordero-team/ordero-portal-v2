import { NgModule } from '@angular/core';
import { AkaAutogrowDirective } from '@aka/directives/autogrow/autogrow.directive';

@NgModule({
  declarations: [AkaAutogrowDirective],
  exports: [AkaAutogrowDirective],
})
export class AkaAutogrowModule {}
