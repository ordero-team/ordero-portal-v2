import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared/shared.module';
import { CategoryRoutingModule } from './category-routing.module';
import { CategoryComponent } from './category.component';
import { CategoryDetailComponent } from './detail/detail.component';
import { CategoryListComponent } from './list/list.component';

@NgModule({
  declarations: [CategoryComponent, CategoryListComponent, CategoryDetailComponent],
  imports: [SharedModule, CategoryRoutingModule],
})
export class CategoryModule {}
