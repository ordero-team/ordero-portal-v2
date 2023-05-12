import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GuestGuardService } from '@app/core/guards/auth-guard.service';
import { paramsTree } from '@app/core/helpers/route.helper';
import { INavRoute } from '@app/core/services/navigation.service';
import { AuthService } from '@cs/auth.service';
import { ToastService } from '@cs/toast.service';
import { Form, FormRecord } from '@lib/form';

@Component({
  selector: 'aka-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class AuthResetPasswordComponent implements OnInit {
  @Form({
    password: 'required|minLength:6',
    password_confirmation: 'required|minLength:6|equalTo:password',
  })
  formData: FormRecord;
  isSuccess: boolean;
  token: string;
  count = 4;

  constructor(private toast: ToastService, private auth: AuthService, active: ActivatedRoute, private router: Router) {
    const params = paramsTree(active.snapshot);
    const regex = new RegExp('^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$');
    if (regex.test(params.token)) {
      this.token = params.token;
    } else {
      router.navigate(['/error/not-found']);
    }
  }

  ngOnInit() {
    this.isSuccess = false;
    this.formData.$reset();
    this.formData.$loading = false;
  }

  async submit() {
    this.formData.$loading = true;
    try {
      await this.auth.resetPassword(this.token, this.formData.$payload);
      this.isSuccess = true;
      const interval = setInterval(() => {
        this.count = this.count - 1;
        if (this.count === 0) {
          this.router.navigate(['/login']);
          clearInterval(interval);
        }
      }, 1000);
    } catch (error) {
      this.toast.error('Something bad happened!', error);
    }
    this.formData.$loading = false;
  }
}

export const ResetPasswordNavRoute: INavRoute = {
  name: 'auth.reset-password',
  path: 'reset-password/:token',
  title: 'auth.reset-password',
};

export const ResetPasswordRoute: INavRoute = {
  ...ResetPasswordNavRoute,
  component: AuthResetPasswordComponent,
  canActivate: [GuestGuardService],
};
