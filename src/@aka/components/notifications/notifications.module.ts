import { NotificationsComponent } from '@aka/components/notifications/notifications.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  declarations: [NotificationsComponent],
  imports: [RouterModule, OverlayModule, PortalModule, SharedModule],
  exports: [NotificationsComponent],
})
export class NotificationsModule {}
