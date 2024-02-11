import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared/shared.module';
import { RestaurantRoutingModule } from './restaurant-routing.module';
import { RestaurantComponent } from './restaurant.component';

@NgModule({
  declarations: [RestaurantComponent],
  imports: [SharedModule, RestaurantRoutingModule],
})
export class RestaurantModule {}
