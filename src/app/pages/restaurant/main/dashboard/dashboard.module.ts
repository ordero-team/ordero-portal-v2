import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { RestaurantDashboardComponent } from './dashboard.component';

@NgModule({
  declarations: [RestaurantDashboardComponent],
  imports: [SharedModule, DashboardRoutingModule],
})
export class DashboardModule {}
