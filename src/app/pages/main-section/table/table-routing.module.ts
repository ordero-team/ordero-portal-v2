import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableRoute } from './table.component';

const routes: Routes = [TableRoute];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TableRoutingModule {}
