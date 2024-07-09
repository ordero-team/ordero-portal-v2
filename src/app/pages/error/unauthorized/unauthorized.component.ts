import { Component } from '@angular/core';
import { OwnerAuthService } from '@app/core/services/owner/auth.service';
import { StaffAuthService } from '@app/core/services/staff/auth.service';
import { INavRoute } from '@cs/navigation.service';

@Component({
  selector: 'aka-error-notfound',
  templateUrl: './unauthorized.component.html',
  styleUrls: ['./unauthorized.component.scss'],
})
export class ErrorUnauthorizedComponent {
  constructor(private ownerAuth: OwnerAuthService, private staffAuth: StaffAuthService) {}

  logout() {
    this.ownerAuth.logout();
    this.staffAuth.logout();
  }
}

export const ErrorUnauthorizedRoute: INavRoute = {
  path: 'unauthorized',
  name: 'error.unauthorized',
  title: 'error.unauthorized',
  component: ErrorUnauthorizedComponent,
  resolve: {},
};
