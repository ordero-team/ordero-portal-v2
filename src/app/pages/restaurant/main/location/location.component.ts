import { Component, OnInit } from '@angular/core';
import { appIcons } from '@app/core/helpers/icon.helper';
import { INavRoute } from '@app/core/services/navigation.service';
import { LocationListComponent } from './list/list.component';

@Component({
  selector: 'aka-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss'],
})
export class RestaurantLocationComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}

export const RestaurantLocationNavRoute: INavRoute = {
  path: 'restaurant/:rid/locations',
  name: 'location',
  title: 'location.parent',
  icon: appIcons.locationMarkerSolid,
};

export const RestaurantLocationRoute: INavRoute = {
  ...RestaurantLocationNavRoute,
  path: '',
  component: RestaurantLocationComponent,
  children: [
    {
      path: '',
      pathMatch: 'full',
      title: 'location.parent',
      data: { disableScroll: true },
      component: LocationListComponent,
    },
  ],
};
