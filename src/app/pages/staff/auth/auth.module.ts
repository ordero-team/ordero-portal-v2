import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { StaffForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { StaffChangePasswordComponent } from './change-password/change-password.component';

@NgModule({
  declarations: [AuthComponent, LoginComponent, StaffForgotPasswordComponent, StaffChangePasswordComponent],
  imports: [SharedModule, AuthRoutingModule],
})
export class StaffAuthModule {}
