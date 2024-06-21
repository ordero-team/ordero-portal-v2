import { NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { SharedModule } from '@app/shared/shared.module';
import { OrderListComponent } from './list/list.component';
import { OrderRoutingModule } from './order-routing.module';
import { RestaurantOrderComponent } from './order.component';

@NgModule({
  declarations: [RestaurantOrderComponent, OrderListComponent],
  imports: [SharedModule, OrderRoutingModule, MatTabsModule],
})
export class OrderModule {}
