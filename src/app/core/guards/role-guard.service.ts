import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { INavRoute } from '@cs/navigation.service';
import { RoleService } from '@cs/role.service';

@Injectable({ providedIn: 'root' })
export class RoleGuardService implements CanActivate {
  constructor(private service: RoleService, private router: Router) {}

  public async canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
    const { roles } = route.routeConfig as INavRoute;
    const canActivate = this.service.verifyRole(roles);

    if (!canActivate) {
      return this.router.navigate(['/error/unauthorized']);
    }

    return canActivate;
  }
}
