import { Component, OnInit } from '@angular/core';
import { appIcons } from '@app/core/helpers/icon.helper';
import { INavRoute } from '@app/core/services/navigation.service';

@Component({
  selector: 'aka-setting-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss'],
})
export class SettingRestaurantComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}

export const RestaurantSettingRestaurantNavRoute: INavRoute = {
  path: 'restaurant',
  name: 'restaurant.setting.restaurant',
  title: 'setting.restaurant.parent',
  icon: appIcons.storefrontOutline,
};

export const RestaurantSettingRestaurantRoute: INavRoute = {
  ...RestaurantSettingRestaurantNavRoute,
  component: SettingRestaurantComponent,
};
