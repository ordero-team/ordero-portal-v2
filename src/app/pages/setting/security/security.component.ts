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

export const SettingSecurityNavRoute: INavRoute = {
  path: 'security',
  name: 'setting.security',
  title: 'setting.security.parent',
  icon: appIcons.vpnKey,
};

export const SettingSecurityRoute: INavRoute = {
  ...SettingSecurityNavRoute,
  path: 'security',
  component: SettingSecurityComponent,
};
