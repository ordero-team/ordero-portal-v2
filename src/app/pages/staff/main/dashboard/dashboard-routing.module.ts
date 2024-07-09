import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StaffDashboardRoute } from './dashboard.component';

const routes: Routes = [StaffDashboardRoute];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
