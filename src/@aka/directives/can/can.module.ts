import { NgModule } from '@angular/core';
import { AkaCanDirective, AkaRoleDirective } from './can.directive';

@NgModule({
  declarations: [AkaCanDirective, AkaRoleDirective],
  exports: [AkaCanDirective, AkaRoleDirective],
})
export class AkaCanModule {}
