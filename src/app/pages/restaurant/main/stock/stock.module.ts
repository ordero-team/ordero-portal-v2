import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { StockCreateComponent } from './create/create.component';
import { DetailComponent } from './detail/detail.component';
import { StockListComponent } from './list/list.component';
import { StockRoutingModule } from './stock-routing.module';
import { RestaurantStockComponent } from './stock.component';

@NgModule({
  declarations: [RestaurantStockComponent, StockListComponent, DetailComponent, StockCreateComponent],
  imports: [SharedModule, StockRoutingModule],
})
export class StockModule {}
