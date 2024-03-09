import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { SettingProfileComponent } from './profile/profile.component';
import { SettingRestaurantComponent } from './restaurant/restaurant.component';
import { SettingSecurityComponent } from './security/security.component';
import { SettingRoutingModule } from './setting-routing.module';
import { RestaurantSettingComponent } from './setting.component';

@NgModule({
  declarations: [RestaurantSettingComponent, SettingProfileComponent, SettingRestaurantComponent, SettingSecurityComponent],
  imports: [SharedModule, SettingRoutingModule],
})
export class SettingModule {}
