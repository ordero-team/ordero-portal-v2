import { OwnerProfile } from '@cl/owner/profile.collection';

export class OwnerStateModel {
  access_token?: string;
  user?: OwnerProfile;
}

export class OwnerLoginAction {
  static readonly type = '[Owner] Login';
  constructor(public payload: OwnerStateModel) {}
}

export class OwnerLogoutAction {
  static readonly type = '[Owner] Logout';
}

export class OwnerFetchMeAction {
  static readonly type = '[Owner] Fetch Me';
}
