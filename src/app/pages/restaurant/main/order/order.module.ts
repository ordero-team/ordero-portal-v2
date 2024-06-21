import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OrderListComponent } from './list/list.component';
import { OrderRoutingModule } from './order-routing.module';
import { RestaurantOrderComponent } from './order.component';

@NgModule({
  declarations: [RestaurantOrderComponent, OrderListComponent],
  imports: [CommonModule, OrderRoutingModule],
})
export class OrderModule {}
