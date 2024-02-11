import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { OwnerAuthService } from '../services/owner/auth.service';

@Injectable({
  providedIn: 'root',
})
export class OwnerGuardGuardService {
  private $path = 'restaurant';

  constructor(private auth: OwnerAuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.auth.isAuthenticated()) {
      return true;
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
