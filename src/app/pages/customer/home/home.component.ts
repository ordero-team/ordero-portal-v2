import { Component, OnInit } from '@angular/core';
import { INavRoute } from '@app/core/services/navigation.service';

@Component({
  selector: 'aka-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}

export const CustomerHomeNavRoute: INavRoute = {
  path: 'home',
  name: 'customer.home',
  title: 'customer.home.parent',
};

export const CustomerHomeRoute: INavRoute = {
  ...CustomerHomeNavRoute,
  component: HomeComponent,
};
