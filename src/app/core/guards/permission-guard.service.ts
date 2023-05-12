import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { INavRoute } from '../services/navigation.service';
import { RoleService } from '../services/role.service';

@Injectable({ providedIn: 'root' })
export class PermissionGuardService {
  constructor(private service: RoleService, private router: Router) {}

  public async canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
    const { permissions } = route.routeConfig as INavRoute;
    const canActivate = this.service.verifyPermission(permissions);

    if (!canActivate) {
      return this.router.navigate(['/error/unauthorized']);
    }

    return canActivate;
  }
}
