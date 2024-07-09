import { Component, OnInit } from '@angular/core';
import { StaffProductCollection } from '@app/collections/staff/product.collection';
import { INavRoute } from '@app/core/services/navigation.service';
import { StaffAuthService } from '@app/core/services/staff/auth.service';

@Component({
  selector: 'aka-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class StockCreateComponent implements OnInit {
  product: any;

  constructor(public auth: StaffAuthService, private productCollection: StaffProductCollection) {}

  async ngOnInit(): Promise<void> {
    // const products = await this.productCollection.find({
    //   where: { restaurant_id: this.auth.currentRestaurant.id },
    //   params: { include: 'variants.variant,categories,images' } as any,
    // });
  }

  onChange(e) {
    console.log(e);
  }
}

export const StaffStockCreateNavRoute: INavRoute = {
  path: 'create',
  name: 'stock.create',
  title: 'stock.create.parent',
};

export const StaffStockCreateRoute: INavRoute = {
  ...StaffStockCreateNavRoute,
  component: StockCreateComponent,
};
