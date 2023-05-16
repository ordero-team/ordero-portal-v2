import { DOCUMENT } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';
import { INavRoute } from '@app/core/services/navigation.service';
import { IActionGroup } from '@app/core/states/breadcrumb/breadcrumb.actions';
import { CategoryDetailComponent, CategoryDetailNavRoute, CategoryDetailRoute } from '../detail/detail.component';

@Component({
  selector: 'aka-catagory-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class CategoryListComponent implements OnInit {
  @ViewChild('matDrawer', { static: true }) matDrawer: MatDrawer;

  drawerMode: 'side' | 'over';
  categories = [];

  public actionGroup: IActionGroup = [
    [
      {
        text: 'Create New Category',
        icon: 'roundAddCircle',
        link: './create',
        color: 'primary',
      },
    ],
  ];

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _changeDetectorRef: ChangeDetectorRef,
    @Inject(DOCUMENT) private _document: any,
    private _router: Router
  ) {}

  ngOnInit(): void {}

  /**
   * On backdrop clicked
   */
  onBackdropClicked(): void {
    // Get the current activated route
    let route = this._activatedRoute;
    while (route.firstChild) {
      route = route.firstChild;
    }
    // Go to the parent route
    this._router.navigate(['../'], { relativeTo: route });

    // Mark for check
    this._changeDetectorRef.markForCheck();
  }
}

export const CategoryListNavRoute: INavRoute = {
  path: '',
  name: 'category.list',
  title: 'category.list.parent',
  children: [CategoryDetailNavRoute],
};

export const CategoryListRoute: INavRoute = {
  ...CategoryListNavRoute,
  component: CategoryListComponent,
  children: [
    {
      path: ':category_id',
      component: CategoryDetailComponent,
    },
    CategoryDetailRoute,
  ],
};
