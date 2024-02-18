import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableRoutingModule } from './table-routing.module';
import { RestaurantTableComponent } from './table.component';
import { TableListComponent } from './list/list.component';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  declarations: [RestaurantTableComponent, TableListComponent],
  imports: [SharedModule, TableRoutingModule],
})
export class TableModule {}
