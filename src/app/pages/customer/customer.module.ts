import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { CustomerCartComponent } from './cart/cart.component';
import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerComponent } from './customer.component';
import { HomeComponent } from './home/home.component';
import { DetailComponent } from './restaurant/detail/detail.component';
import { ListComponent } from './restaurant/list/list.component';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { CustomerTableComponent } from './table/table.component';
import { OrderComponent } from './order/order.component';

@NgModule({
  declarations: [
    CustomerComponent,
    HomeComponent,
    RestaurantComponent,
    ListComponent,
    DetailComponent,
    CustomerTableComponent,
    CustomerCartComponent,
    OrderComponent,
  ],
  imports: [SharedModule, CustomerRoutingModule],
})
export class CustomerModule {}
