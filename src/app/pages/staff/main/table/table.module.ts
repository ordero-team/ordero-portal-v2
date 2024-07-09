import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared/shared.module';
import { TableListComponent } from './list/list.component';
import { TableRoutingModule } from './table-routing.module';
import { StaffTableComponent } from './table.component';

@NgModule({
  declarations: [StaffTableComponent, TableListComponent],
  imports: [SharedModule, TableRoutingModule],
})
export class TableModule {}
