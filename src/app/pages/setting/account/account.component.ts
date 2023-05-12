import { Component, OnInit } from '@angular/core';
import { appIcons } from '@app/core/helpers/icon.helper';
import { AuthService } from '@app/core/services/auth.service';
import { INavRoute } from '@app/core/services/navigation.service';

@Component({
  selector: 'aka-setting-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class SettingAccountComponent implements OnInit {
  constructor(public auth: AuthService) {}

  ngOnInit(): void {}
}

export const SettingAccountNavRoute: INavRoute = {
  path: 'account',
  name: 'setting.account',
  title: 'setting.account.parent',
  icon: appIcons.userCircle,
};

export const SettingAccountRoute: INavRoute = {
  ...SettingAccountNavRoute,
  path: 'account',
  component: SettingAccountComponent,
};
