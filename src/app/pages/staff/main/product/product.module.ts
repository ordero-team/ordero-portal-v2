import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared/shared.module';
import { CategoryComponent } from './category/category.component';
import { StaffProductMainCreateComponent } from './main/create/create.component';
import { StaffProductMainDetailComponent } from './main/detail/detail.component';
import { StaffProductMainDetailHistoryComponent } from './main/detail/history/history.component';
import { ManageComponent } from './main/detail/manage/manage.component';
import { StaffProductMainDetailOverviewComponent } from './main/detail/overview/overview.component';
import { StaffProductMainListComponent } from './main/list/list.component';
import { StaffProductMainComponent } from './main/main.component';
import { ProductRoutingModule } from './product-routing.module';
import { StaffProductComponent } from './product.component';

@NgModule({
  declarations: [
    StaffProductComponent,
    StaffProductMainComponent,
    CategoryComponent,
    StaffProductMainListComponent,
    StaffProductMainCreateComponent,
    StaffProductMainDetailComponent,
    StaffProductMainDetailOverviewComponent,
    ManageComponent,
    StaffProductMainDetailHistoryComponent,
  ],
  imports: [SharedModule, ProductRoutingModule],
})
export class ProductModule {}
