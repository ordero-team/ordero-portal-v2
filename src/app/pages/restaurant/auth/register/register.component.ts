import { Component, OnInit } from '@angular/core';
import { OwnerGuestGuardService } from '@app/core/guards/owner-guard.service';
import { INavRoute } from '@app/core/services/navigation.service';
import { OwnerAuthService } from '@app/core/services/owner/auth.service';
import { ToastService } from '@app/core/services/toast.service';
import { Form, FormRecord } from '@lib/form';

@Component({
  selector: 'aka-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RestaurantRegisterComponent implements OnInit {
  @Form({
    email: 'required|email',
    name: 'required',
    phone: 'required',
    password: 'required|minLength:6',
    password_confirmation: 'required|minLength:6|equalTo:password',
    restaurant: 'required',
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
      await this.auth.register(this.formData.$payload);
      this.toast.info('Successfully registered');
    } catch (error) {
      this.toast.error('Something bad happened!', error);
    }
    this.formData.$loading = false;
  }
}

export const RestaurantRegisterNavRoute: INavRoute = {
  path: 'register',
  name: 'restaurant.auth.register',
  title: 'auth.register',
};

export const RestaurantRegisterRoute: INavRoute = {
  ...RestaurantRegisterNavRoute,
  component: RestaurantRegisterComponent,
  canActivate: [OwnerGuestGuardService],
};
