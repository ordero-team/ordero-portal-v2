import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { RestaurantProductCategoryComponent } from './category/category.component';
import { RestaurantProductGroupComponent } from './group/group.component';
import { RestaurantProductCreateComponent } from './main/create/create.component';
import { RestaurantProductDetailComponent } from './main/detail/detail.component';
import { RestaurantProductDetailHistoryComponent } from './main/detail/history/history.component';
import { RestaurantProductDetailManageComponent } from './main/detail/manage/manage.component';
import { RestaurantProductDetailOverviewComponent } from './main/detail/overview/overview.component';
import { RestaurantProductListComponent } from './main/list/list.component';
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
    RestaurantProductListComponent,
    RestaurantProductCreateComponent,
    RestaurantProductDetailComponent,
    RestaurantProductDetailOverviewComponent,
    RestaurantProductDetailManageComponent,
    RestaurantProductDetailHistoryComponent,
  ],
  imports: [SharedModule, ProductRoutingModule],
})
export class ProductModule {}
