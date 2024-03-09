import { Component, OnInit } from '@angular/core';
import { appIcons } from '@app/core/helpers/icon.helper';
import { INavRoute } from '@app/core/services/navigation.service';

@Component({
  selector: 'aka-setting-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.scss'],
})
export class SettingSecurityComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}

export const RestaurantSettingSecurityNavRoute: INavRoute = {
  path: 'security',
  name: 'restaurant.setting.security',
  title: 'setting.security.parent',
  icon: appIcons.cogIcon,
};

export const RestaurantSettingSecurityRoute: INavRoute = {
  ...RestaurantSettingSecurityNavRoute,
  component: SettingSecurityComponent,
};
