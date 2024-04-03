import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OwnerProduct, OwnerProductCollection } from '@app/collections/owner/product.collection';
import { INavRoute } from '@app/core/services/navigation.service';
import { OwnerAuthService } from '@app/core/services/owner/auth.service';
import { IActionGroup } from '@app/core/states/breadcrumb/breadcrumb.actions';
import { MetalQuery } from '@lib/metal-data';
import { MetalQueryRowAction } from '@mtl/components/metal-query/metal-query.component';

@Component({
  selector: 'aka-product-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class RestaurantProductListComponent implements OnInit {
  public query: MetalQuery<OwnerProduct>;
  public type: OwnerProduct;

  public actionGroup: IActionGroup = [
    [
      {
        icon: 'plusIcon',
        text: 'Create Product',
        color: 'primary',
        click: () => {
          this.router.navigate(['../create'], { relativeTo: this.active });
        },
      },
    ],
  ];

  public rowActions: MetalQueryRowAction<OwnerProduct>[] = [
    {
      icon: 'roundEdit',
      text: 'Edit',
      action: (data) => {
        return () => {
          this.router.navigate(['../', data.id], { relativeTo: this.active });
        };
      },
    },
  ];

  constructor(
    private router: Router,
    private active: ActivatedRoute,
    private collection: OwnerProductCollection,
    private auth: OwnerAuthService
  ) {}

  ngOnInit() {
    this.query = this.collection
      .query()
      .params({ restaurant_id: this.auth.currentRestaurant.id, include: 'variants,categories,images' });
  }
}

export const RestaurantProductMainListNavRoute: INavRoute = {
  path: '',
  name: 'restaurant.product.main.list',
  title: 'product.main.list.parent',
};

export const RestaurantProductMainListRoute: INavRoute = {
  ...RestaurantProductMainListNavRoute,
  component: RestaurantProductListComponent,
};
