import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared/shared.module';
import { SettingAccountComponent } from './account/account.component';
import { NotificationComponent } from './notification/notification.component';
import { SettingSecurityComponent } from './security/security.component';
import { SettingRoutingModule } from './setting-routing.module';
import { SettingComponent } from './setting.component';

@NgModule({
  declarations: [SettingComponent, SettingAccountComponent, SettingSecurityComponent, NotificationComponent],
  imports: [SharedModule, SettingRoutingModule],
})
export class SettingModule {}
