import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StaffProduct } from '@app/collections/staff/product.collection';
import { INavRoute } from '@app/core/services/navigation.service';
import { StaffAuthService } from '@app/core/services/staff/auth.service';
import { IActionGroup } from '@app/core/states/breadcrumb/breadcrumb.actions';
import { MetalQueryRowAction } from '@mtl/components/metal-query/metal-query.component';

@Component({
  selector: 'aka-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class StaffProductMainListComponent implements OnInit {
  public actionGroup: IActionGroup = [
    [
      {
        icon: 'plusIcon',
        text: 'Create Product',
        color: 'primary',
        click: () => {
          this.router.navigate(['../create'], { relativeTo: this.active });
        },
      },
    ],
  ];

  public rowActions: MetalQueryRowAction<StaffProduct>[] = [
    {
      icon: 'roundEdit',
      text: 'Edit',
      action: (data) => {
        return () => {
          this.router.navigate(['../', data.id], { relativeTo: this.active });
        };
      },
    },
  ];

  constructor(public auth: StaffAuthService, private router: Router, private active: ActivatedRoute) {}

  ngOnInit(): void {}
}

export const StaffProductMainListNavRoute: INavRoute = {
  path: '',
  name: 'staff.product.main.list',
  title: 'product.main.list.parent',
};

export const StaffProductMainListRoute: INavRoute = {
  ...StaffProductMainListNavRoute,
  component: StaffProductMainListComponent,
};
