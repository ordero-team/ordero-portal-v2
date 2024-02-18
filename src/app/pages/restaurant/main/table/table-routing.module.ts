import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RestaurantTableRoute } from './table.component';

const routes: Routes = [RestaurantTableRoute];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TableRoutingModule {}
