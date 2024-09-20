import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OwnerGuestGuardService } from '@app/core/guards/owner-guard.service';
import { StaffGuestGuardService } from '@app/core/guards/staff-guard.service';
import { paramsTree } from '@app/core/helpers/route.helper';
import { DarkModeService } from '@app/core/services/dark-mode.service';
import { INavRoute } from '@app/core/services/navigation.service';
import { OwnerAuthService } from '@app/core/services/owner/auth.service';
import { StaffAuthService } from '@app/core/services/staff/auth.service';
import { ToastService } from '@app/core/services/toast.service';
import { Form, FormRecord } from '@lib/form';

@Component({
  selector: 'aka-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class StaffChangePasswordComponent implements OnInit {
  @Form({
    password: 'required|minLength:6',
    password_confirmation: 'required|minLength:6|equalTo:password',
  })
  formData: FormRecord;
  isSuccess: boolean;
  token: string;
  count = 4;

  constructor(
    private toast: ToastService,
    private auth: StaffAuthService,
    private active: ActivatedRoute,
    private router: Router,
    public darkMode: DarkModeService
  ) {
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
          this.auth.toGuestArea(false);
          clearInterval(interval);
        }
      }, 1000);
    } catch (error) {
      this.toast.error('Something bad happened!', error);
    }
    this.formData.$loading = false;
  }
}

export const StaffChangePasswordNavRoute: INavRoute = {
  name: 'staff.auth.resetPassword',
  path: 'reset-password/:token',
  title: 'auth.resetPassword',
};

export const StaffChangePasswordRoute: INavRoute = {
  ...StaffChangePasswordNavRoute,
  component: StaffChangePasswordComponent,
  canActivate: [StaffGuestGuardService],
};
