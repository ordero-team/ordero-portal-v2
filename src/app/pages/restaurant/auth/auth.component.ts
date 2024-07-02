import { Component, OnInit } from '@angular/core';
import { DarkModeService } from '@app/core/services/dark-mode.service';
import { INavRoute } from '@cs/navigation.service';
import { RestaurantLoginNavRoute, RestaurantLoginRoute } from './login/login.component';
import { RestaurantRegisterNavRoute, RestaurantRegisterRoute } from './register/register.component';
import { RestaurantVerifyNavRoute, RestaurantVerifyRoute } from './verify/verify.component';

@Component({
  selector: 'aka-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class RestaurantAuthComponent implements OnInit {
  constructor(public darkMode: DarkModeService) {}

  ngOnInit(): void {}
}

export const RestaurantAuthNavRoute: INavRoute = {
  path: '',
  name: 'owner.auth',
  title: 'auth.parent',
  children: [RestaurantLoginNavRoute, RestaurantRegisterNavRoute, RestaurantVerifyNavRoute],
};

export const RestaurantAuthRoute: INavRoute = {
  ...RestaurantAuthNavRoute,
  component: RestaurantAuthComponent,
  children: [
    {
      path: '',
      pathMatch: 'full',
      redirectTo: 'login',
    },
    RestaurantLoginRoute,
    RestaurantRegisterRoute,
    RestaurantVerifyRoute,
  ],
};
