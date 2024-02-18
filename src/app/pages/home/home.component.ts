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

export const HomeNavRoute: INavRoute = {
  path: '',
  name: 'home',
  title: 'home.parent',
};

export const HomeRoute: INavRoute = {
  ...HomeNavRoute,
  component: HomeComponent,
};
