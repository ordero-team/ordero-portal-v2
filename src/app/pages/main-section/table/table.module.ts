import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared/shared.module';
import { TableDetailComponent } from './detail/detail.component';
import { TableListComponent } from './list/list.component';
import { TableRoutingModule } from './table-routing.module';
import { TableComponent } from './table.component';

@NgModule({
  declarations: [TableComponent, TableListComponent, TableDetailComponent],
  imports: [SharedModule, TableRoutingModule],
})
export class TableModule {}
