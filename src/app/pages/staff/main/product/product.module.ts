import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import { CategoryComponent } from './category/category.component';
import { MainComponent } from './main/main.component';

@NgModule({
  declarations: [ProductComponent, CategoryComponent, MainComponent],
  imports: [CommonModule, ProductRoutingModule],
})
export class ProductModule {}
