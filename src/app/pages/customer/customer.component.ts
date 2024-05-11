import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { INavRoute } from '@app/core/services/navigation.service';
import { ScanQrComponent } from '@app/shared/components/customer/scan-qr/scan-qr.component';
import { CustomerHomeNavRoute, CustomerHomeRoute } from './home/home.component';

@Component({
  selector: 'aka-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
})
export class CustomerComponent implements OnInit {
  constructor(private _bottomSheet: MatBottomSheet) {}

  ngOnInit(): void {}

  openBottomSheet(): void {
    this._bottomSheet.open(ScanQrComponent, {
      hasBackdrop: true,
    });
  }
}

export const CustomerNavRoute: INavRoute = {
  path: '',
  name: 'customer',
  title: 'customer.parent',
  children: [CustomerHomeNavRoute],
};

export const CustomerRoute: INavRoute = {
  ...CustomerNavRoute,
  component: CustomerComponent,
  children: [
    {
      path: '',
      pathMatch: 'full',
      redirectTo: 'home',
    },
    CustomerHomeRoute,
  ],
};
