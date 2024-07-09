import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StaffTableRoute } from './table.component';

const routes: Routes = [StaffTableRoute];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TableRoutingModule {}
