import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared/shared.module';
import { SettingRoutingModule } from './setting-routing.module';
import { RestaurantSettingComponent } from './setting.component';

@NgModule({
  declarations: [RestaurantSettingComponent],
  imports: [SharedModule, SettingRoutingModule],
})
export class SettingModule {}
