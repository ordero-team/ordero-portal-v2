import { Component, OnInit } from '@angular/core';
import { OwnerProductCollection } from '@app/collections/owner/product.collection';
import { INavRoute } from '@app/core/services/navigation.service';
import { OwnerAuthService } from '@app/core/services/owner/auth.service';

@Component({
  selector: 'aka-stock-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class StockCreateComponent implements OnInit {
  product: any;

  constructor(public auth: OwnerAuthService, private productCollection: OwnerProductCollection) {}

  async ngOnInit(): Promise<void> {
    const products = await this.productCollection.find({
      where: { restaurant_id: this.auth.currentRestaurant.id },
      params: { include: 'variants.variant,categories,images' } as any,
    });
  }

  onChange(e) {
    console.log(e);
  }
}

export const RestaurantStockCreateNavRoute: INavRoute = {
  path: 'create',
  name: 'restaurant.stock.create',
  title: 'stock.create.parent',
};

export const RestaurantStockCreateRoute: INavRoute = {
  ...RestaurantStockCreateNavRoute,
  component: StockCreateComponent,
};
