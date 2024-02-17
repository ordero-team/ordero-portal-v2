import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OwnerProfileCollection } from '@app/collections/owner/profile.collection';
import { OwnerFetchMeAction, OwnerLoginAction, OwnerLogoutAction } from '@app/core/states/owner/owner.actions';
import { OwnerState } from '@app/core/states/owner/owner.state';
import { Profile } from '@cl/profile.collection';
import { Store } from '@ngxs/store';
import { OwnerAuthCollection } from '../../../collections/owner/auth.collection';

export interface IOwnerRegisterPayload {
  email: string;
  name: string;
  phone: string;
  password: string;
  password_confirmation: string;
  restaurant: string;
}

@Injectable({ providedIn: 'root' })
export class OwnerAuthService {
  redirectUrl: string;

  private $path = 'restaurant';

  get access_token() {
    return this.store.selectSnapshot(OwnerState.accessToken);
  }

  get currentUser(): Profile {
    return this.store.selectSnapshot(OwnerState.currentUser);
  }

  get currentRestaurant() {
    return this.store.selectSnapshot(OwnerState.currentRestaurant);
  }

  get isVerify() {
    return this.store.selectSnapshot(OwnerState.currentUser).status === 'verify';
  }

  constructor(
    private router: Router,
    private store: Store,
    private auth: OwnerAuthCollection,
    private profile: OwnerProfileCollection,
    private route: ActivatedRoute
  ) {}

  async login(payload) {
    try {
      const { access_token } = await this.auth.login(payload);

      // Dispatch AUTH TOKEN
      await this.store.dispatch(new OwnerLoginAction({ access_token })).toPromise();
      await this.store.dispatch(new OwnerFetchMeAction()).toPromise();
      // Redirect previous link
      const params = this.route.snapshot.queryParams;
      if (params['redirectURL']) {
        this.redirectUrl = params['redirectURL'];
      }

      if (this.redirectUrl) {
        this.router.navigateByUrl(this.redirectUrl).catch(() => this.toDashboardArea());
      } else {
        if (this.isVerify) {
          this.toVerifyArea();
        } else {
          this.toDashboardArea();
        }
      }
    } catch (error) {
      throw error;
    }
  }

  async register(payload: IOwnerRegisterPayload) {
    try {
      const { access_token } = await this.auth.register(payload);

      // Dispatch AUTH TOKEN
      await this.store.dispatch(new OwnerLoginAction({ access_token })).toPromise();
      await this.store.dispatch(new OwnerFetchMeAction()).toPromise();
      this.toDashboardArea();
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
    this.store.dispatch(new OwnerLogoutAction());
    this.toGuestArea(reload);
  }

  toDashboardArea() {
    this.router.navigate([`/${this.$path}/${this.currentRestaurant.slug}/dashboard`]);
  }

  toHomePage() {
    this.router.navigate(['']);
  }

  toVerifyArea() {
    this.router.navigate([this.$path, 'auth', 'verify']);
  }

  toGuestArea(reload) {
    // Use this line if you want to reload the public page'
    if (reload && window) {
      window.location.href = this.$path + '/auth/login';
    } else {
      this.router.navigate([this.$path, 'auth', 'login']);
    }
  }

  isAuthenticated() {
    return this.access_token !== undefined;
  }

  async fetchMe() {
    // Get Profile
    const user = await this.profile.findOne('');
    await this.store.dispatch(new OwnerLoginAction({ user }));
    return user;
  }
}
