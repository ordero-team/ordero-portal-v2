import { Component, OnInit } from '@angular/core';
import { INavRoute } from '@app/core/services/navigation.service';
import { appIcons } from '@ch/icon.helper';
import { RestaurantSettingProfileNavRoute, RestaurantSettingProfileRoute } from './profile/profile.component';
import { RestaurantSettingRestaurantNavRoute, RestaurantSettingRestaurantRoute } from './restaurant/restaurant.component';
import { RestaurantSettingSecurityNavRoute, RestaurantSettingSecurityRoute } from './security/security.component';

@Component({
  selector: 'aka-restaurant-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss'],
})
export class RestaurantSettingComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}

export const RestaurantSettingNavRoute: INavRoute = {
  path: 'restaurant/:rid/settings',
  name: 'restaurant.setting',
  title: 'setting.parent',
  icon: appIcons.baselineSettings,
  children: [RestaurantSettingProfileNavRoute, RestaurantSettingRestaurantNavRoute, RestaurantSettingSecurityNavRoute],
};

export const RestaurantSettingRoute: INavRoute = {
  ...RestaurantSettingNavRoute,
  path: '',
  component: RestaurantSettingComponent,
  children: [
    {
      path: '',
      pathMatch: 'full',
      redirectTo: 'profile',
    },
    RestaurantSettingProfileRoute,
    RestaurantSettingRestaurantRoute,
    RestaurantSettingSecurityRoute,
  ],
};
