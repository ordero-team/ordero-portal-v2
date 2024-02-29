import { Injectable } from '@angular/core';
import { ProfileCollection } from '@cl/profile.collection';
import { ToastService } from '@cs/toast.service';
import { AuthStateModel, FetchMeAction, LoginAction, LogoutAction } from '@ct/auth/auth.actions';
import { ClearRoleAction, PatchRoleAction } from '@ct/role/role.actions';
import { Action, NgxsOnInit, Selector, State, StateContext } from '@ngxs/store';
import { from, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@State<AuthStateModel>({ name: 'auth' })
@Injectable()
export class AuthState implements NgxsOnInit {
  @Selector()
  static accessToken(state: AuthStateModel) {
    return state.access_token;
  }

  @Selector()
  static pubsubToken(state: AuthStateModel) {
    return state.pubsub_token;
  }

  @Selector()
  static currentUser(state: AuthStateModel) {
    return state.user;
  }

  constructor(private toast: ToastService, private profile: ProfileCollection) {}

  ngxsOnInit({ dispatch, getState }: StateContext<AuthStateModel>) {
    // @TODO: Enable when customer site ready to create
    // const { access_token } = getState();
    // if (access_token) {
    //   dispatch(new FetchMeAction());
    // }
  }

  @Action(LoginAction)
  login({ setState, getState }: StateContext<AuthStateModel>, { payload }: LoginAction) {
    setState({ ...getState(), ...payload });
  }

  @Action(LogoutAction)
  logout({ setState, dispatch }: StateContext<AuthStateModel>) {
    setState({});
    dispatch([new ClearRoleAction()]);
  }

  @Action(FetchMeAction)
  fetchMe({ setState, getState, dispatch }: StateContext<AuthStateModel>) {
    return from(this.profile.findOne('', { params: { include: 'role,warehouse' } })).pipe(
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
