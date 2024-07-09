import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StaffProductRoute } from './product.component';

const routes: Routes = [StaffProductRoute];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRoutingModule {}
