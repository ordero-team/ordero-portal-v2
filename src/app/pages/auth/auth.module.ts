import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';

import { ToggleDarkModeModule } from '../../../@aka/components/toggle-dark-mode/toggle-dark-mode.module';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { AuthForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AuthLoginComponent } from './login/login.component';
import { AuthResetPasswordComponent } from './reset-password/reset-password.component';

@NgModule({
  declarations: [AuthComponent, AuthLoginComponent, AuthForgotPasswordComponent, AuthResetPasswordComponent],
  imports: [SharedModule, AuthRoutingModule, ToggleDarkModeModule],
})
export class AuthModule {}
