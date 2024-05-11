import { Component, OnInit } from '@angular/core';
import { INavRoute } from '@app/core/services/navigation.service';
import { CustomerHomeNavRoute, CustomerHomeRoute } from './home/home.component';

@Component({
  selector: 'aka-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
})
export class CustomerComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}

export const CustomerNavRoute: INavRoute = {
  path: '',
  name: 'customer',
  title: 'customer.parent',
  children: [CustomerHomeNavRoute],
};

export const CustomerRoute: INavRoute = {
  ...CustomerNavRoute,
  component: CustomerComponent,
  children: [
    {
      path: '',
      pathMatch: 'full',
      redirectTo: 'home',
    },
    CustomerHomeRoute,
  ],
};
