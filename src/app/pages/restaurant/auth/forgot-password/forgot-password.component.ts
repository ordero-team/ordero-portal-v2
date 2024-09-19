import { Component, OnInit } from '@angular/core';
import { OwnerGuestGuardService } from '@app/core/guards/owner-guard.service';
import { DarkModeService } from '@app/core/services/dark-mode.service';
import { INavRoute } from '@app/core/services/navigation.service';
import { OwnerAuthService } from '@app/core/services/owner/auth.service';
import { ToastService } from '@app/core/services/toast.service';
import { Form, FormRecord } from '@lib/form';

@Component({
  selector: 'aka-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class RestaurantForgotPasswordComponent implements OnInit {
  @Form({
    email: 'required|email',
  })
  formData: FormRecord;
  isSuccess: boolean;

  constructor(private toast: ToastService, private auth: OwnerAuthService, public darkMode: DarkModeService) {}

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

export const RestaurantForgotPasswordNavRoute: INavRoute = {
  name: 'restaurant.auth.forgotPassword',
  path: 'forgot-password',
  title: 'auth.forgotPassword',
};

export const RestaurantForgotPasswordRoute: INavRoute = {
  ...RestaurantForgotPasswordNavRoute,
  component: RestaurantForgotPasswordComponent,
  canActivate: [OwnerGuestGuardService],
};
