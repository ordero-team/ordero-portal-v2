import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OwnerProduct } from '@app/collections/owner/product.collection';
import { INavRoute } from '@app/core/services/navigation.service';
import { OwnerAuthService } from '@app/core/services/owner/auth.service';
import { ToastService } from '@app/core/services/toast.service';

@Component({
  selector: 'aka-product-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class RestaurantProductCreateComponent {
  constructor(
    private toast: ToastService,
    private router: Router,
    private route: ActivatedRoute,
    public auth: OwnerAuthService
  ) {}

  onSuccess(data: { product: OwnerProduct; another: boolean }) {
    this.toast.info(`${data.product.name} successfully added!`);
    if (!data.another) {
      this.router.navigate([`../`], { relativeTo: this.route });
    }
  }
}

export const RestaurantProductMainCreateNavRoute: INavRoute = {
  path: 'create',
  name: 'restaurant.product.main.create',
  title: 'product.main.create.parent',
};

export const RestaurantProductMainCreateRoute: INavRoute = {
  ...RestaurantProductMainCreateNavRoute,
  component: RestaurantProductCreateComponent,
};
