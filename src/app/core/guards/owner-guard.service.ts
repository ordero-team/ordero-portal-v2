import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { get } from 'lodash';
import { Observable } from 'rxjs';
import { OwnerAuthService } from '../services/owner/auth.service';

@Injectable({ providedIn: 'root' })
export class OwnerAuthGuardService implements CanActivate {
  private $path = 'restaurant';

  constructor(private auth: OwnerAuthService, private router: Router) {}

  canActivate() {
    if (this.auth.isAuthenticated()) {
      return true;
    }

    this.auth.clearState();
    return false;
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.auth.isAuthenticated()) {
      return true;
    }

    this.auth.clearState();
    // Redirect previous link
    this.router.navigate([this.$path, 'auth', 'login'], { queryParams: { redirectURL: state.url } });
    return false;
  }
}

@Injectable({ providedIn: 'root' })
export class OwnerGuestGuardService implements CanActivate {
  constructor(private auth: OwnerAuthService) {}

  canActivate(route: ActivatedRouteSnapshot) {
    if (!this.auth.isAuthenticated()) {
      if (get(route, 'routeConfig.path') === 'restaurant') {
        this.auth.toGuestArea(false);
        return false;
      }

      return true;
    }

    this.auth.toDashboardArea();
    return false;
  }
}

@Injectable({ providedIn: 'root' })
export class OwnerVerifiedGuardService implements CanActivate {
  constructor(private auth: OwnerAuthService) {}

  canActivate() {
    if (!['verify'].includes(this.auth.currentUser.status)) {
      return true;
    }

    this.auth.toVerifyArea();
    return false;
  }
}

@Injectable({ providedIn: 'root' })
export class OwnerUnverifiedGuardService implements CanActivate {
  constructor(private auth: OwnerAuthService) {}

  canActivate() {
    if (['verify'].includes(this.auth.currentUser.status)) {
      return true;
    }

    this.auth.toDashboardArea();
    return false;
  }
}
