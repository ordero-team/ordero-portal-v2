import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { StaffListComponent } from './list/list.component';
import { StaffRoutingModule } from './staff-routing.module';
import { RestaurantStaffComponent } from './staff.component';

@NgModule({
  declarations: [RestaurantStaffComponent, StaffListComponent],
  imports: [SharedModule, StaffRoutingModule],
})
export class StaffModule {}
