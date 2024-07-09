import { Component, OnInit } from '@angular/core';
import { appIcons } from '@app/core/helpers/icon.helper';
import { INavRoute } from '@app/core/services/navigation.service';
import { RestaurantProductCategoryNavRoute, RestaurantProductCategoryRoute } from './category/category.component';
import { RestaurantProductGroupNavRoute, RestaurantProductGroupRoute } from './group/group.component';
import { RestaurantProductMainNavRoute, RestaurantProductMainRoute } from './main/main.component';
import { RestaurantProductVariantNavRoute, RestaurantProductVariantRoute } from './variant/variant.component';

@Component({
  selector: 'aka-restaurant-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class RestaurantProductComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}

export const RestaurantProductNavRoute: INavRoute = {
  path: 'restaurant/:rid/products',
  name: 'restaurant.product',
  title: 'product.parent',
  icon: appIcons.foodOutline,
  children: [
    RestaurantProductMainNavRoute,
    {
      type: 'divider',
    },
    RestaurantProductCategoryNavRoute,
    RestaurantProductGroupNavRoute,
    RestaurantProductVariantNavRoute,
  ],
};

export const RestaurantProductRoute: INavRoute = {
  ...RestaurantProductNavRoute,
  path: '',
  component: RestaurantProductComponent,
  children: [
    {
      path: '',
      pathMatch: 'full',
      redirectTo: 'main',
    },
    RestaurantProductMainRoute,
    RestaurantProductCategoryRoute,
    RestaurantProductGroupRoute,
    RestaurantProductVariantRoute,
  ],
};
