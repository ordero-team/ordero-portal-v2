import { Injectable } from '@angular/core';
import { SetLanguage, SetMenuCollapsed, SetSetting, UIStateModel } from '@ct/ui/ui.actions';
import { Action, Selector, State, StateContext } from '@ngxs/store';

@State<UIStateModel>({
  name: 'ui',
  defaults: {
    language: 'fr',
    isMobileView: false,
    isTabletView: false,
    isMobileMenuOpen: false,
    isMenuCollapsed: true,
  },
})
@Injectable()
export class UIState {
  @Selector()
  static getLanguage(state: UIStateModel) {
    return state.language;
  }

  @Selector()
  static getIsMenuCollapsed(state: UIStateModel) {
    return state.isMenuCollapsed;
  }

  @Action(SetMenuCollapsed)
  setMenuCollapsed({ patchState }: StateContext<UIStateModel>, { collapsed }: SetMenuCollapsed) {
    patchState({ isMenuCollapsed: collapsed });
  }

  @Action(SetLanguage)
  setLanguage({ patchState }: StateContext<UIStateModel>, { language }: SetLanguage) {
    patchState({ language });
  }

  @Action(SetSetting)
  setSetting({ patchState }: StateContext<UIStateModel>, { settings }: SetSetting) {
    patchState({ ...settings });
  }
}
