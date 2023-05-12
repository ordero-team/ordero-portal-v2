import { Injectable } from '@angular/core';
import { decrypt } from '@ch/encrypt.helper';
import { ClearRoleAction, PatchRoleAction, RoleStateModel } from '@ct/role/role.actions';
import { Action, Selector, State, StateContext } from '@ngxs/store';

@State<RoleStateModel>({ name: 'role' })
@Injectable()
export class RoleState {
  @Selector()
  static permissions(state: RoleStateModel) {
    return state.permissions;
  }

  @Selector()
  static currentRole(state: RoleStateModel) {
    return state;
  }

  @Action(ClearRoleAction)
  logout({ setState }: StateContext<RoleStateModel>) {
    setState({});
  }

  @Action(PatchRoleAction)
  patchRole({ patchState }: StateContext<RoleStateModel>, { payload }: PatchRoleAction) {
    patchState({ ...payload, permissions: decrypt(payload.permissions).toString() });
  }
}
