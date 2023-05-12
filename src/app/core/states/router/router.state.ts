import { Injectable } from '@angular/core';
import {
  RouterStateModel,
  SetNavigationCancel,
  SetNavigationEnd,
  SetNavigationError,
  SetNavigationStart,
  SetQueryParams,
  SetSnapshot,
} from '@ct/router/router.actions';
import { Action, Selector, State, StateContext } from '@ngxs/store';

@State<RouterStateModel>({
  name: 'route',
  defaults: {},
})
@Injectable()
export class RouterState {
  @Selector()
  static NavStart(state: RouterStateModel) {
    return state.NavigationStart;
  }

  @Selector()
  static NavEnd(state: RouterStateModel) {
    return state.NavigationEnd;
  }

  @Selector()
  static NavCancel(state: RouterStateModel) {
    return state.NavigationCancel;
  }

  @Selector()
  static NavError(state: RouterStateModel) {
    return state.NavigationError;
  }

  @Selector()
  static snapshot(state: RouterStateModel) {
    return state.snapshot;
  }

  @Selector()
  static queryParams(state: RouterStateModel) {
    return { query: state.query, params: state.params };
  }

  @Action(SetNavigationStart)
  setNavigationStart(ctx: StateContext<RouterStateModel>, { event }: SetNavigationStart) {
    ctx.patchState({ NavigationStart: event });
  }

  @Action(SetNavigationEnd)
  setNavigationEnd(ctx: StateContext<RouterStateModel>, { event }: SetNavigationEnd) {
    ctx.patchState({ NavigationEnd: event });
  }

  @Action(SetNavigationCancel)
  setNavigationCancel(ctx: StateContext<RouterStateModel>, { event }: SetNavigationCancel) {
    ctx.patchState({ NavigationCancel: event });
  }

  @Action(SetNavigationError)
  setNavigationError(ctx: StateContext<RouterStateModel>, { event }: SetNavigationError) {
    ctx.patchState({ NavigationError: event });
  }

  @Action(SetSnapshot)
  setSnapshot(ctx: StateContext<RouterStateModel>, { snapshot }: SetSnapshot) {
    ctx.patchState({ snapshot });
  }

  @Action(SetQueryParams)
  setQueryParams(ctx: StateContext<RouterStateModel>, { query, params }: SetQueryParams) {
    ctx.patchState({ query, params });
  }
}
