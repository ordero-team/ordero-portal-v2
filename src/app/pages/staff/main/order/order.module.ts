import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared/shared.module';
import { StaffOrderListComponent } from './list/list.component';
import { OrderRoutingModule } from './order-routing.module';
import { StaffOrderComponent } from './order.component';

@NgModule({
  declarations: [StaffOrderComponent, StaffOrderListComponent],
  imports: [SharedModule, OrderRoutingModule],
})
export class OrderModule {}
