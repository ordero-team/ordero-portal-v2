import { Component } from '@angular/core';
import { INavRoute } from '@cs/navigation.service';
import { ErrorNotfoundRoute } from '@pg/error/notfound/notfound.component';
import { ErrorUnauthorizedRoute } from '@pg/error/unauthorized/unauthorized.component';

@Component({
  selector: 'aka-error',
  template: '<router-outlet></router-outlet>',
})
export class ErrorComponent {}

export const ErrorNavRoute: INavRoute = {
  path: '',
  name: 'error',
  title: 'error',
};

export const ErrorRoute: INavRoute = {
  ...ErrorNavRoute,
  path: '',
  component: ErrorComponent,
  children: [ErrorNotfoundRoute, ErrorUnauthorizedRoute],
};
