import { Injectable } from '@angular/core';
import { StaffLocation, StaffProfileCollection } from '@app/collections/staff/profile.collection';
import { ToastService } from '@cs/toast.service';
import { ClearRoleAction, PatchRoleAction } from '@ct/role/role.actions';
import { Action, NgxsOnInit, Selector, State, StateContext } from '@ngxs/store';
import { from, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { StaffFetchMeAction, StaffLoginAction, StaffLogoutAction, StaffStateModel } from './staff.actions';

@State<StaffStateModel>({ name: 'staff' })
@Injectable()
export class StaffState implements NgxsOnInit {
  @Selector()
  static accessToken(state: StaffStateModel) {
    return state.access_token;
  }

  @Selector()
  static currentUser(state: StaffStateModel) {
    return state.user;
  }

  @Selector()
  static currentRestaurant(state: StaffStateModel) {
    return state.user.restaurant;
  }

  @Selector()
  static currentLocation(state: StaffStateModel): StaffLocation {
    return state.user.location;
  }

  constructor(private toast: ToastService, private profile: StaffProfileCollection) {}

  ngxsOnInit({ dispatch, getState }: StateContext<StaffStateModel>) {
    const { access_token } = getState();
    if (access_token) {
      dispatch(new StaffFetchMeAction());
    }
  }

  @Action(StaffLoginAction)
  login({ setState, getState }: StateContext<StaffStateModel>, { payload }: StaffLoginAction) {
    setState({ ...getState(), ...payload });
  }

  @Action(StaffLogoutAction)
  logout({ setState, dispatch }: StateContext<StaffStateModel>) {
    setState({});
    dispatch([new ClearRoleAction()]);
  }

  @Action(StaffFetchMeAction)
  fetchMe({ setState, getState, dispatch }: StateContext<StaffStateModel>) {
    return from(this.profile.findOne('', { params: { include: 'role,restaurant,location' } })).pipe(
      map((res) => {
        const { role = {}, ...rest } = res;
        setState({ ...getState(), user: { role, ...rest } });
        dispatch([new PatchRoleAction(role)]);
      }),
      catchError((error) => {
        this.toast.error('Unable to fetch user!', error);
        dispatch([new StaffLogoutAction()]);

        return of(null);
      })
    );
  }
}
