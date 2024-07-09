import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared/shared.module';
import { StockCreateComponent } from './create/create.component';
import { StockListComponent } from './list/list.component';
import { StockRoutingModule } from './stock-routing.module';
import { StaffStockComponent } from './stock.component';

@NgModule({
  declarations: [StaffStockComponent, StockCreateComponent, StockListComponent],
  imports: [SharedModule, StockRoutingModule],
})
export class StockModule {}
