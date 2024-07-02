import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StaffOrderRoute } from './order.component';

const routes: Routes = [StaffOrderRoute];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderRoutingModule {}
