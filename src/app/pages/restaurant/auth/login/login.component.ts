import { Component, OnInit } from '@angular/core';
import { INavRoute } from '@app/core/services/navigation.service';
import { OwnerAuthService } from '@app/core/services/owner/auth.service';
import { ToastService } from '@app/core/services/toast.service';
import { Form, FormRecord } from '@lib/form';

@Component({
  selector: 'aka-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class RestaurantLoginComponent implements OnInit {
  @Form({
    username: 'required|email',
    password: 'required|minLength:6',
  })
  formData: FormRecord;

  constructor(private toast: ToastService, private auth: OwnerAuthService) {}

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

export const RestaurantLoginNavRoute: INavRoute = {
  name: 'restaurant.auth.login',
  path: 'login',
  title: 'auth.login',
};

export const RestaurantLoginRoute: INavRoute = {
  ...RestaurantLoginNavRoute,
  component: RestaurantLoginComponent,
};
