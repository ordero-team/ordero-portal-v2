import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerComponent } from './customer.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [CustomerComponent, HomeComponent],
  imports: [SharedModule, CustomerRoutingModule],
})
export class CustomerModule {}
