import { Component, OnInit } from '@angular/core';
import { StaffGuestGuardService } from '@app/core/guards/staff-guard.service';
import { INavRoute } from '@app/core/services/navigation.service';
import { StaffAuthService } from '@app/core/services/staff/auth.service';
import { ToastService } from '@app/core/services/toast.service';
import { Form, FormRecord } from '@lib/form';

@Component({
  selector: 'aka-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @Form({
    username: 'required|email',
    password: 'required|minLength:6',
  })
  formData: FormRecord;

  constructor(private toast: ToastService, private auth: StaffAuthService) {}

  ngOnInit() {
    this.formData.$reset();
    this.formData.$loading = false;
  }

  async submit() {
    this.formData.$loading = true;
    try {
      await this.auth.login(this.formData.$payload);
    } catch (error) {
      this.toast.error('Something bad happened!', error);
    }
    this.formData.$loading = false;
  }
}

export const StaffLoginNavRoute: INavRoute = {
  path: 'login',
  name: 'staff.auth.login',
  title: 'auth.login',
};

export const StaffLoginRoute: INavRoute = {
  ...StaffLoginNavRoute,
  component: LoginComponent,
  canActivate: [StaffGuestGuardService],
};
