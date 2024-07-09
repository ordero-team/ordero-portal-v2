import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared/shared.module';
import { StaffProductCategoryComponent } from './category/category.component';
import { StaffProductGroupComponent } from './group/group.component';
import { StaffProductMainCreateComponent } from './main/create/create.component';
import { StaffProductMainDetailComponent } from './main/detail/detail.component';
import { StaffProductMainDetailHistoryComponent } from './main/detail/history/history.component';
import { ManageComponent } from './main/detail/manage/manage.component';
import { StaffProductMainDetailOverviewComponent } from './main/detail/overview/overview.component';
import { StaffProductMainListComponent } from './main/list/list.component';
import { StaffProductMainComponent } from './main/main.component';
import { ProductRoutingModule } from './product-routing.module';
import { StaffProductComponent } from './product.component';
import { StaffProductVariantComponent } from './variant/variant.component';

@NgModule({
  declarations: [
    StaffProductComponent,
    StaffProductMainComponent,
    StaffProductCategoryComponent,
    StaffProductMainListComponent,
    StaffProductMainCreateComponent,
    StaffProductMainDetailComponent,
    StaffProductMainDetailOverviewComponent,
    ManageComponent,
    StaffProductMainDetailHistoryComponent,
    StaffProductGroupComponent,
    StaffProductVariantComponent,
  ],
  imports: [SharedModule, ProductRoutingModule],
})
export class ProductModule {}
