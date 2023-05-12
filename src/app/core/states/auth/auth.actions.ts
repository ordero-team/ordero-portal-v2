import { Profile } from '@cl/profile.collection';

export class AuthStateModel {
  access_token?: string;
  pubsub_token?: string;
  user?: Profile;
}

export class LoginAction {
  static readonly type = '[Auth] Login';
  constructor(public payload: AuthStateModel) {}
}

export class LogoutAction {
  static readonly type = '[Auth] Logout';
}

export class FetchMeAction {
  static readonly type = '[Auth] Fetch Me';
}
