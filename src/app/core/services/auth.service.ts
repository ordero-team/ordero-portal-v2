import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthCollection } from '@app/collections/auth.collection';
import { Profile, ProfileCollection } from '@cl/profile.collection';
import { FetchMeAction, LoginAction, LogoutAction } from '@ct/auth/auth.actions';
import { AuthState } from '@ct/auth/auth.state';
import { Store } from '@ngxs/store';

@Injectable({ providedIn: 'root' })
export class AuthService {
  redirectUrl: string;

  get access_token() {
    return this.store.selectSnapshot(AuthState.accessToken);
  }

  get pubsub_token() {
    return this.store.selectSnapshot(AuthState.pubsubToken);
  }

  get currentUser(): Profile {
    return this.store.selectSnapshot(AuthState.currentUser);
  }

  constructor(
    private router: Router,
    private store: Store,
    private auth: AuthCollection,
    private profile: ProfileCollection,
    private route: ActivatedRoute
  ) {}

  async login(payload) {
    try {
      const { access_token, pubsub_token } = await this.auth.login(payload);

      // Dispatch AUTH TOKEN
      await this.store.dispatch(new LoginAction({ access_token, pubsub_token })).toPromise();
      await this.store.dispatch(new FetchMeAction()).toPromise();
      // Redirect previous link
      const params = this.route.snapshot.queryParams;
      if (params['redirectURL']) {
        this.redirectUrl = params['redirectURL'];
      }

      if (this.redirectUrl) {
        this.router.navigateByUrl(this.redirectUrl).catch(() => this.toDashboardArea());
      } else {
        this.toDashboardArea();
      }
    } catch (error) {
      throw error;
    }
  }

  async register(payload) {
    try {
      await this.auth.register(payload);
    } catch (error) {
      throw error;
    }
  }

  async forgotPassword(payload) {
    try {
      await this.auth.forgotPassword(payload);
    } catch (error) {
      throw error;
    }
  }

  async resetPassword(token, payload) {
    try {
      await this.auth.resetPassword(token, payload);
    } catch (error) {
      throw error;
    }
  }

  async resend(payload) {
    try {
      return await this.auth.resendVerification(payload);
    } catch (e) {
      throw e;
    }
  }

  async logout() {
    try {
      this.clearState();
    } catch (error) {
      throw error;
    }
  }

  clearState(reload = false) {
    // Clear state for user and company
    this.store.dispatch(new LogoutAction());
    this.toGuestArea(reload);
  }

  toDashboardArea() {
    this.router.navigate([`/dashboard`]);
  }

  toGuestArea(reload) {
    // Use this line if you want to reload the public page'
    if (reload && window) {
      window.location.href = '/login';
    } else {
      this.router.navigate(['/login']);
    }
  }

  isAuthenticated() {
    return this.access_token !== undefined;
  }

  async fetchMe() {
    // Get Profile
    const user = await this.profile.findOne('');
    await this.store.dispatch(new LoginAction({ user }));
    return user;
  }
}
