import { Injectable } from '@angular/core';
import { OwnerProfileCollection } from '@app/collections/owner/profile.collection';
import { ToastService } from '@cs/toast.service';
import { ClearRoleAction, PatchRoleAction } from '@ct/role/role.actions';
import { Action, NgxsOnInit, Selector, State, StateContext } from '@ngxs/store';
import { from, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { OwnerFetchMeAction, OwnerLoginAction, OwnerLogoutAction, OwnerStateModle } from './owner.actions';

@State<OwnerStateModle>({ name: 'owner' })
@Injectable()
export class OwnerState implements NgxsOnInit {
  @Selector()
  static accessToken(state: OwnerStateModle) {
    return state.access_token;
  }

  @Selector()
  static currentUser(state: OwnerStateModle) {
    return state.user;
  }

  @Selector()
  static currentRestaurant(state: OwnerStateModle) {
    return state.user.restaurant;
  }

  constructor(private toast: ToastService, private profile: OwnerProfileCollection) {}

  ngxsOnInit({ dispatch, getState }: StateContext<OwnerStateModle>) {
    const { access_token } = getState();
    if (access_token) {
      dispatch(new OwnerFetchMeAction());
    }
  }

  @Action(OwnerLoginAction)
  login({ setState, getState }: StateContext<OwnerStateModle>, { payload }: OwnerLoginAction) {
    setState({ ...getState(), ...payload });
  }

  @Action(OwnerLogoutAction)
  logout({ setState, dispatch }: StateContext<OwnerStateModle>) {
    setState({});
    dispatch([new ClearRoleAction()]);
  }

  @Action(OwnerFetchMeAction)
  fetchMe({ setState, getState, dispatch }: StateContext<OwnerStateModle>) {
    return from(this.profile.findOne('', { params: { include: 'role,restaurant' } })).pipe(
      map((res) => {
        const { role = {}, ...rest } = res;
        setState({ ...getState(), user: { role, ...rest } });
        dispatch([new PatchRoleAction(role)]);
      }),
      catchError((error) => {
        this.toast.error('Unable to fetch user!', error);
        return of(null);
      })
    );
  }
}
