import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { RestaurantProductCategoryComponent } from './category/category.component';
import { RestaurantProductGroupComponent } from './group/group.component';
import { RestaurantProductMainComponent } from './main/main.component';
import { ProductRoutingModule } from './product-routing.module';
import { RestaurantProductComponent } from './product.component';
import { RestaurantProductVariantComponent } from './variant/variant.component';

@NgModule({
  declarations: [
    RestaurantProductComponent,
    RestaurantProductCategoryComponent,
    RestaurantProductVariantComponent,
    RestaurantProductMainComponent,
    RestaurantProductGroupComponent,
  ],
  imports: [SharedModule, ProductRoutingModule],
})
export class ProductModule {}
