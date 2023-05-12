import { Component } from '@angular/core';
import { INavRoute } from '@cs/navigation.service';

@Component({
  selector: 'aka-error-notfound',
  templateUrl: './unauthorized.component.html',
  styleUrls: ['./unauthorized.component.scss'],
})
export class ErrorUnauthorizedComponent {}

export const ErrorUnauthorizedRoute: INavRoute = {
  path: 'unauthorized',
  name: 'error.unauthorized',
  title: 'error.unauthorized',
  component: ErrorUnauthorizedComponent,
  resolve: {},
};
