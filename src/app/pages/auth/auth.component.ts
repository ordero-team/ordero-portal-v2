import { Component } from '@angular/core';
import { DarkModeService } from '@app/core/services/dark-mode.service';
import { INavRoute } from '@cs/navigation.service';
import { LoginNavRoute, LoginRoute } from '@pg/auth/login/login.component';
import { ForgotPasswordNavRoute, ForgotPasswordRoute } from './forgot-password/forgot-password.component';
import { ResetPasswordNavRoute, ResetPasswordRoute } from './reset-password/reset-password.component';

@Component({
  selector: 'aka-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  constructor(public darkMode: DarkModeService) {}
}

export const AuthNavRoute: INavRoute = {
  path: '',
  name: 'auth',
  title: 'auth.parent',
  children: [LoginNavRoute, ForgotPasswordNavRoute, ResetPasswordNavRoute],
};

export const AuthRoute: INavRoute = {
  ...AuthNavRoute,
  component: AuthComponent,
  children: [
    {
      path: '',
      pathMatch: 'full',
      redirectTo: 'login',
    },
    LoginRoute,
    ForgotPasswordRoute,
    ResetPasswordRoute,
  ],
};
