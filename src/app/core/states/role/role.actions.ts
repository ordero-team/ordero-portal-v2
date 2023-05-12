export class RoleStateModel {
  id?: string;
  name?: string;
  permissions?: string;
}

export class PatchRoleAction {
  static readonly type = '[Role] Patch Role';

  constructor(public payload: RoleStateModel) {}
}

export class ClearRoleAction {
  static readonly type = '[Role] Clear Role';
}
