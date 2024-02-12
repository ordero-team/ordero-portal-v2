import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { AuthService } from '@cs/auth.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthGuardService implements CanActivate, CanActivateChild {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.auth.isAuthenticated()) {
      return true;
    }

    this.auth.clearState();
    // Redirect previous link
    // this.router.navigate(['login'], { queryParams: { redirectURL: state.url } });
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
    // this.router.navigate(['login'], { queryParams: { redirectURL: state.url } });
    return false;
  }
}

@Injectable({ providedIn: 'root' })
export class GuestGuardService implements CanActivate {
  constructor(private auth: AuthService) {}

  canActivate() {
    if (!this.auth.isAuthenticated()) {
      return true;
    }

    this.auth.toDashboardArea();
    return false;
  }
}
