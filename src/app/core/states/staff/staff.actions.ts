import { StaffProfile } from '@app/collections/staff/profile.collection';

export class StaffStateModel {
  access_token?: string;
  user?: StaffProfile;
}

export class StaffLoginAction {
  static readonly type = '[Staff] Login';
  constructor(public payload: StaffStateModel) {}
}

export class StaffLogoutAction {
  static readonly type = '[Staff] Logout';
}

export class StaffFetchMeAction {
  static readonly type = '[Staff] Fetch Me';
}
