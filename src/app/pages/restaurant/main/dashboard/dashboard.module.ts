import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { RestaurantDashboardComponent } from './dashboard.component';
import { TotalOrderComponent } from './components/total-order/total-order.component';
import { TotalSalesComponent } from './components/total-sales/total-sales.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ChartOrderComponent } from './components/chart-order/chart-order.component';

@NgModule({
  declarations: [RestaurantDashboardComponent, TotalOrderComponent, TotalSalesComponent, ChartOrderComponent],
  imports: [SharedModule, DashboardRoutingModule, NgApexchartsModule],
})
export class DashboardModule {}
