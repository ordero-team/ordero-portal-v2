import { Component } from '@angular/core';
import { INavRoute } from '@cs/navigation.service';

@Component({
  selector: 'aka-error-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.scss'],
})
export class ErrorNotfoundComponent {}

export const ErrorNotfoundRoute: INavRoute = {
  path: '',
  name: 'error.not-found',
  title: 'error.notFound',
  pathMatch: 'full',
  component: ErrorNotfoundComponent,
  resolve: {},
};
