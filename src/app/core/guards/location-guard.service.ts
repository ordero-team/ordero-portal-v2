import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { StaffAuthService } from '../services/staff/auth.service';
import { ToastService } from '../services/toast.service';

@Injectable({
  providedIn: 'root',
})
export class LocationGuardService implements CanActivate {
  constructor(private router: Router, private auth: StaffAuthService, private toats: ToastService) {}

  canActivate(router: ActivatedRouteSnapshot): Observable<boolean> | Promise<boolean> | boolean | UrlTree {
    if (this.auth.isAuthenticated()) {
      const { status, slug } = this.auth.currentRestaurant;
      let url = '';

      // Verify and Replace current slug
      if (slug !== router.params.locid) {
        this.router.navigateByUrl(url);
        return false;
      }

      if (typeof status !== 'undefined') {
        // Check if company Status is active
        switch (status) {
          case 'active':
            return true; // Navigate to dashboard page

          case 'inactive':
            this.toats.warning(`You're Restaurant is inactive. Please contact our support.`);
            url = `/error/inactive-company`;
            break;
        }

        this.router.navigateByUrl(url);
        return false;
      }
    }

    this.auth.logout();
    return false;
  }
}
