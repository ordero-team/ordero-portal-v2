import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OwnerProfile } from '@app/collections/owner/profile.collection';
import { StaffAuthCollection } from '@app/collections/staff/auth.collection';
import { StaffProfileCollection } from '@app/collections/staff/profile.collection';
import { StaffFetchMeAction, StaffLoginAction, StaffLogoutAction } from '@app/core/states/staff/staff.actions';
import { StaffState } from '@app/core/states/staff/staff.state';
import { Store } from '@ngxs/store';

@Injectable({ providedIn: 'root' })
export class StaffAuthService {
  redirectUrl: string;

  private $path = 'staff';

  get access_token() {
    return this.store.selectSnapshot(StaffState.accessToken);
  }

  get currentUser(): OwnerProfile {
    return this.store.selectSnapshot(StaffState.currentUser);
  }

  get currentRestaurant() {
    return this.store.selectSnapshot(StaffState.currentRestaurant);
  }

  get isVerify() {
    return this.store.selectSnapshot(StaffState.currentUser).status === 'verify';
  }

  constructor(
    private router: Router,
    private store: Store,
    private auth: StaffAuthCollection,
    private profile: StaffProfileCollection,
    private route: ActivatedRoute
  ) {}

  async login(payload) {
    try {
      const { access_token } = await this.auth.login(payload);
      // Dispatch AUTH TOKEN
      await this.store.dispatch(new StaffLoginAction({ access_token })).toPromise();
      await this.store.dispatch(new StaffFetchMeAction()).toPromise();
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
    this.store.dispatch(new StaffLogoutAction());
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
    this.store.dispatch(new StaffLoginAction({ user }));
    return user;
  }
}
