import { AkaNavigationModule } from '@aka/components/navigation/navigation.module';
import { NotificationsModule } from '@aka/components/notifications/notifications.module';
import { UserMenuModule } from '@aka/components/user-menu/user-menu.module';
import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { ToggleDarkModeModule } from '../../@aka/components/toggle-dark-mode/toggle-dark-mode.module';
import { EmptyComponent } from './empty/empty.component';
import { HorizonalLayoutComponent } from './horizontal/horizontal.component';
import { VerticalComponent } from './vertical/vertical.component';

@NgModule({
  declarations: [EmptyComponent, VerticalComponent, HorizonalLayoutComponent],
  exports: [EmptyComponent],
  imports: [SharedModule, UserMenuModule, NotificationsModule, AkaNavigationModule, ToggleDarkModeModule],
})
export class LayoutsModule {}
