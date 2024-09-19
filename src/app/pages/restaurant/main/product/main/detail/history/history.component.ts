import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OwnerProduct } from '@app/collections/owner/product.collection';
import { INavRoute } from '@app/core/services/navigation.service';
import { OwnerAuthService } from '@app/core/services/owner/auth.service';

@Component({
  selector: 'aka-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class RestaurantProductDetailHistoryComponent implements OnInit {
  product: OwnerProduct;

  constructor(active: ActivatedRoute, public auth: OwnerAuthService) {
    active.parent.data.subscribe((data) => {
      for (const [key, value] of Object.entries(data)) {
        this[key] = value;
      }
    });
  }

  ngOnInit(): void {}
}

export const RestaurantProductMainDetailHistoryNavRoute: INavRoute = {
  path: 'histories',
  name: 'restaurant.product.main.detail.history',
  title: 'product.main.history.parent',
};

export const RestaurantProductMainDetailHistoryRoute: INavRoute = {
  ...RestaurantProductMainDetailHistoryNavRoute,
  component: RestaurantProductDetailHistoryComponent,
};
