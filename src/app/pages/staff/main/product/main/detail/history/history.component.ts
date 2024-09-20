import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StaffProduct } from '@app/collections/staff/product.collection';
import { INavRoute } from '@app/core/services/navigation.service';
import { StaffAuthService } from '@app/core/services/staff/auth.service';

@Component({
  selector: 'aka-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class StaffProductMainDetailHistoryComponent implements OnInit {
  product: StaffProduct;

  constructor(active: ActivatedRoute, public auth: StaffAuthService) {
    active.parent.data.subscribe((data) => {
      for (const [key, value] of Object.entries(data)) {
        this[key] = value;
      }
    });
  }

  ngOnInit(): void {}
}

export const StaffProductMainDetailHistoryNavRoute: INavRoute = {
  path: 'histories',
  name: 'staff.product.main.detail.history',
  title: 'product.main.history.parent',
};

export const StaffProductMainDetailHistoryRoute: INavRoute = {
  ...StaffProductMainDetailHistoryNavRoute,
  component: StaffProductMainDetailHistoryComponent,
};
