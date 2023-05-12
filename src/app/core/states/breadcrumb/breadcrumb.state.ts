import { Injectable } from '@angular/core';
import { BreadcrumbStateModel, SetBreadcrumbAction, SetBreadcrumbGroup } from '@ct/breadcrumb/breadcrumb.actions';
import { Action, Selector, State, StateContext } from '@ngxs/store';

@State<BreadcrumbStateModel>({
  name: 'breadcrumb',
})
@Injectable()
export class BreadcrumbState {
  @Selector()
  static getActions(state: BreadcrumbStateModel) {
    return state.actions;
  }

  @Selector()
  static getGroups(state: BreadcrumbStateModel) {
    return state.groups;
  }

  @Action(SetBreadcrumbAction)
  setActions({ patchState }: StateContext<BreadcrumbStateModel>, { actions }: BreadcrumbStateModel) {
    patchState({ actions });
  }

  @Action(SetBreadcrumbGroup)
  setGroups({ patchState }: StateContext<BreadcrumbStateModel>, { groups }: BreadcrumbStateModel) {
    patchState({ groups });
  }
}
