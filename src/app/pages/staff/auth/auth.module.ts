import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [AuthComponent, LoginComponent],
  imports: [SharedModule, AuthRoutingModule],
})
export class StaffAuthModule {}
