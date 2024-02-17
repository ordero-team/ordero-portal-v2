import { Component, OnInit } from '@angular/core';
import { INavRoute } from '@app/core/services/navigation.service';
import { appIcons } from '@ch/icon.helper';

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
};

export const RestaurantSettingRoute: INavRoute = {
  ...RestaurantSettingNavRoute,
  path: '',
  component: RestaurantSettingComponent,
};
