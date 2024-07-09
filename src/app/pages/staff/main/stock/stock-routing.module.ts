import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StaffStockRoute } from './stock.component';

const routes: Routes = [StaffStockRoute];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StockRoutingModule {}
