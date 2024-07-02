import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { get } from 'lodash';
import { Observable } from 'rxjs';
import { StaffAuthService } from '../services/staff/auth.service';

@Injectable({
  providedIn: 'root',
})
export class StaffGuardService implements CanActivate {
  private $path = 'staff';

  constructor(private auth: StaffAuthService, private router: Router) {}

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
export class StaffGuestGuardService implements CanActivate {
  constructor(private auth: StaffAuthService) {}

  canActivate(route: ActivatedRouteSnapshot) {
    if (!this.auth.isAuthenticated()) {
      if (get(route, 'routeConfig.path') === 'staff') {
        this.auth.toGuestArea(false);
        return false;
      }

      return true;
    }

    this.auth.toDashboardArea();
    return false;
  }
}
