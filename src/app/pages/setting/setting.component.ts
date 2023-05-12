import { Component, OnInit } from '@angular/core';
import { appIcons } from '@app/core/helpers/icon.helper';
import { INavRoute } from '@app/core/services/navigation.service';
import { SettingAccountNavRoute, SettingAccountRoute } from './account/account.component';
import { SettingSecurityNavRoute, SettingSecurityRoute } from './security/security.component';

@Component({
  selector: 'aka-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss'],
})
export class SettingComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}

export const SettingNavRoute: INavRoute = {
  path: 'settings',
  name: 'setting',
  title: 'setting.parent',
  icon: appIcons.baselineSettings,
  children: [SettingAccountNavRoute, SettingSecurityNavRoute],
};

export const SettingRoute: INavRoute = {
  ...SettingNavRoute,
  path: '',
  component: SettingComponent,
  children: [
    {
      path: '',
      pathMatch: 'full',
      redirectTo: 'account',
    },
    SettingAccountRoute,
    SettingSecurityRoute,
  ],
};
