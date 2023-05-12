import { Injectable } from '@angular/core';
import { RoleState } from '@ct/role/role.state';
import { Store } from '@ngxs/store';

@Injectable({ providedIn: 'root' })
export class RoleService {
  get role() {
    return this.store.selectSnapshot(RoleState.currentRole);
  }

  get permissions() {
    return this.store.selectSnapshot(RoleState.permissions);
  }

  constructor(private store: Store) {}

  verifyRole(roles: string | string[]): boolean {
    if (!roles || !roles.length || !([this.role.name] || []).length) {
      return false;
    }

    roles = Array.isArray(roles) ? roles : [roles];
    return roles.includes(this.role.name);
  }

  verifyPermission(permissions: string | string[]): boolean {
    if (!permissions || !permissions.length || !(this.permissions || []).length) {
      return false;
    }

    // AND logic
    permissions = Array.isArray(permissions) ? permissions : [permissions];
    for (const permission of permissions) {
      if (!(this.permissions || []).includes(permission)) {
        return false;
      }
    }

    return true;
  }
}
