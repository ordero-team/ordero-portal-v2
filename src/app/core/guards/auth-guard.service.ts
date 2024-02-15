import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';
import { AuthService } from '@cs/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuardService implements CanActivate, CanActivateChild {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate() {
    if (this.auth.isAuthenticated()) {
      return true;
    }

    this.auth.clearState();
    // Redirect previous link
    // this.router.navigate(['login'], { queryParams: { redirectURL: state.url } });
    return false;
  }

  canActivateChild() {
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
