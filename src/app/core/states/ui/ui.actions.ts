export class UIStateModel {
  language?: string;
  isMobileView?: boolean;
  isTabletView?: boolean;
  isMobileMenuOpen?: boolean;
  isMenuCollapsed?: boolean;
}

export class SetLanguage {
  static readonly type = '[UI] Set Language';
  constructor(public language: string) {}
}

export class SetMenuCollapsed {
  static readonly type = '[UI] Set Menu Collapsed';
  constructor(public collapsed: boolean) {}
}

export class SetSetting {
  static readonly type = '[UI] Set Setting';
  constructor(public settings: UIStateModel) {}
}
