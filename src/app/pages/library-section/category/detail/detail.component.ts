import { Component, OnDestroy, OnInit } from '@angular/core';
import { INavRoute } from '@app/core/services/navigation.service';
import { CategoryListComponent } from '../list/list.component';

@Component({
  selector: 'aka-category-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class CategoryDetailComponent implements OnInit, OnDestroy {
  constructor(private _categoryListComponent: CategoryListComponent) {}

  ngOnInit(): void {
    // Open the drawer
    this._categoryListComponent.matDrawer.open();
  }

  ngOnDestroy(): void {
    this._categoryListComponent.matDrawer.close();
  }
}

export const CategoryDetailNavRoute: INavRoute = {
  path: ':category_id',
  name: 'category.detail',
  title: 'category.detail.parent',
};

export const CategoryDetailRoute: INavRoute = {
  ...CategoryDetailNavRoute,
  component: CategoryDetailComponent,
};
