import { AuthState } from '@ct/auth/auth.state';
import { BreadcrumbState } from '@ct/breadcrumb/breadcrumb.state';
import { RoleState } from '@ct/role/role.state';
import { RouterState } from '@ct/router/router.state';
import { UIState } from '@ct/ui/ui.state';
import { OwnerState } from './owner/owner.state';
import { RestaurantState } from './restaurant/restaurant.state';

// RoleState => Error encryptor

export const states = [UIState, RouterState, AuthState, BreadcrumbState, RoleState, OwnerState, RestaurantState];
