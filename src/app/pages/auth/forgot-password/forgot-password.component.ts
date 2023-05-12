import { Component, OnInit } from '@angular/core';
import { GuestGuardService } from '@app/core/guards/auth-guard.service';
import { AuthService } from '@cs/auth.service';
import { INavRoute } from '@cs/navigation.service';
import { ToastService } from '@cs/toast.service';
import { Form, FormRecord } from '@lib/form';

@Component({
  selector: 'aka-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class AuthForgotPasswordComponent implements OnInit {
  @Form({
    email: 'required|email',
  })
  formData: FormRecord;
  isSuccess: boolean;

  constructor(private toast: ToastService, private auth: AuthService) {}

  ngOnInit() {
    this.isSuccess = false;
    this.formData.$reset();
    this.formData.$loading = false;
  }

  async submit() {
    this.formData.$loading = true;
    try {
      await this.auth.forgotPassword(this.formData.$payload);
      this.isSuccess = true;
    } catch (error) {
      this.toast.error('Something bad happened!', error);
    }
    this.formData.$loading = false;
  }
}

export const ForgotPasswordNavRoute: INavRoute = {
  name: 'auth.forgot-password',
  path: 'forgot-password',
  title: 'auth.forgot-password',
};

export const ForgotPasswordRoute: INavRoute = {
  ...ForgotPasswordNavRoute,
  component: AuthForgotPasswordComponent,
  canActivate: [GuestGuardService],
};
