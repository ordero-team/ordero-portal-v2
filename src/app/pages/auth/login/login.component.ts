import { Component, OnInit } from '@angular/core';
import { AuthService } from '@cs/auth.service';
import { INavRoute } from '@cs/navigation.service';
import { ToastService } from '@cs/toast.service';
import { Form, FormRecord } from '@lib/form';

@Component({
  selector: 'aka-auth-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class AuthLoginComponent implements OnInit {
  @Form({
    email: 'required|email',
    password: 'required|minLength:6',
  })
  formData: FormRecord;

  constructor(private toast: ToastService, private auth: AuthService) {}

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

export const LoginNavRoute: INavRoute = {
  name: 'auth.login',
  path: 'login',
  title: 'auth.login',
};

export const LoginRoute: INavRoute = {
  ...LoginNavRoute,
  component: AuthLoginComponent,
};
