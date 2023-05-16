import { ChangeDetectionStrategy, Component } from '@angular/core';
import { appIcons } from '@app/core/helpers/icon.helper';
import { INavRoute } from '@app/core/services/navigation.service';
import { CategoryListNavRoute, CategoryListRoute } from './list/list.component';

@Component({
  selector: 'aka-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryComponent {}

export const CategoryNavRoute: INavRoute = {
  path: 'categories',
  name: 'category',
  title: 'category.parent',
  icon: appIcons.outlineCategory,
  children: [CategoryListNavRoute],
};

export const CategoryRoute: INavRoute = {
  ...CategoryNavRoute,
  path: '',
  component: CategoryComponent,
  children: [CategoryListRoute],
};
