import { Injectable } from '@angular/core';
import { OwnerLocation, OwnerProfileCollection } from '@app/collections/owner/profile.collection';
import { ToastService } from '@cs/toast.service';
import { ClearRoleAction, PatchRoleAction } from '@ct/role/role.actions';
import { Action, NgxsOnInit, Selector, State, StateContext } from '@ngxs/store';
import { from, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { OwnerFetchMeAction, OwnerLoginAction, OwnerLogoutAction, OwnerStateModel } from './owner.actions';

@State<OwnerStateModel>({ name: 'owner' })
@Injectable()
export class OwnerState implements NgxsOnInit {
  @Selector()
  static accessToken(state: OwnerStateModel) {
    return state.access_token;
  }

  @Selector()
  static currentUser(state: OwnerStateModel) {
    return state.user;
  }

  @Selector()
  static currentRestaurant(state: OwnerStateModel) {
    return state.user.restaurant;
  }

  @Selector()
  static currentLocation(state: OwnerStateModel): OwnerLocation {
    return state.user.location;
  }

  constructor(private toast: ToastService, private profile: OwnerProfileCollection) {}

  ngxsOnInit({ dispatch, getState }: StateContext<OwnerStateModel>) {
    const { access_token } = getState();
    if (access_token) {
      dispatch(new OwnerFetchMeAction());
    }
  }

  @Action(OwnerLoginAction)
  login({ setState, getState }: StateContext<OwnerStateModel>, { payload }: OwnerLoginAction) {
    setState({ ...getState(), ...payload });
  }

  @Action(OwnerLogoutAction)
  logout({ setState, dispatch }: StateContext<OwnerStateModel>) {
    setState({});
    dispatch([new ClearRoleAction()]);
  }

  @Action(OwnerFetchMeAction)
  fetchMe({ setState, getState, dispatch }: StateContext<OwnerStateModel>) {
    return from(this.profile.findOne('', { params: { include: 'role,restaurant,location' } })).pipe(
      map((res) => {
        const { role = {}, ...rest } = res;
        setState({ ...getState(), user: { role, ...rest } });
        dispatch([new PatchRoleAction(role)]);
      }),
      catchError((error) => {
        this.toast.error('Unable to fetch user!', error);
        dispatch([new OwnerLogoutAction()]);

        return of(null);
      })
    );
  }
}
