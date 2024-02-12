import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { OwnerAuthService } from '../services/owner/auth.service';

@Injectable({
  providedIn: 'root',
})
export class OwnerAuthGuardService {
  private $path = 'restaurant';

  constructor(private auth: OwnerAuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.auth.isAuthenticated()) {
      const { status } = this.auth.currentUser;
      const { slug } = this.auth.currentRestaurant;
      let url = '';

      // Verify and Replace current slug
      if (slug !== route.params.rid) {
        this.router.navigateByUrl(url);
        return false;
      }

      if (typeof status !== 'undefined') {
        // Check if company Status is active
        switch (status) {
          case 'active':
            return true; // Navigate to dashboard page

          case 'blocked':
          case 'inactive':
            url = `/error`;
            break;
        }

        this.router.navigateByUrl(url);
        return false;
      }
    }

    this.auth.clearState();
    // Redirect previous link
    this.router.navigate([this.$path, 'auth', 'login'], { queryParams: { redirectURL: state.url } });
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

  canActivate() {
    if (!this.auth.isAuthenticated()) {
      return true;
    }

    this.auth.toDashboardArea();
    return false;
  }
}
