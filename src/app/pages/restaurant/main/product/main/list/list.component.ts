import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OwnerProduct } from '@app/collections/owner/product.collection';
import { INavRoute } from '@app/core/services/navigation.service';
import { OwnerAuthService } from '@app/core/services/owner/auth.service';
import { IActionGroup } from '@app/core/states/breadcrumb/breadcrumb.actions';
import { MetalQueryRowAction } from '@mtl/components/metal-query/metal-query.component';

@Component({
  selector: 'aka-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class RestaurantProductListComponent implements OnInit {
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
          this.router.navigate([`../${data.id}`], { relativeTo: this.active });
        };
      },
    },
  ];

  constructor(private router: Router, private active: ActivatedRoute, public auth: OwnerAuthService) {}

  ngOnInit() {}
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
