import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared/shared.module';
import { LocationListComponent } from './list/list.component';
import { LocationRoutingModule } from './location-routing.module';
import { RestaurantLocationComponent } from './location.component';

@NgModule({
  declarations: [RestaurantLocationComponent, LocationListComponent],
  imports: [SharedModule, LocationRoutingModule],
})
export class LocationModule {}
