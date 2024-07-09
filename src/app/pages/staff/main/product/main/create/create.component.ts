import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StaffProduct } from '@app/collections/staff/product.collection';
import { INavRoute } from '@app/core/services/navigation.service';
import { StaffAuthService } from '@app/core/services/staff/auth.service';
import { ToastService } from '@app/core/services/toast.service';

@Component({
  selector: 'aka-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class StaffProductMainCreateComponent {
  constructor(
    private toast: ToastService,
    private router: Router,
    private route: ActivatedRoute,
    public auth: StaffAuthService
  ) {}

  onSuccess(data: { product: StaffProduct; another: boolean }) {
    this.toast.info(`${data.product.name} successfully added!`);
    if (!data.another) {
      this.router.navigate([`../`], { relativeTo: this.route });
    }
  }
}

export const StaffProductMainCreateNavRoute: INavRoute = {
  path: 'create',
  name: 'staff.product.main.create',
  title: 'product.main.create.parent',
};

export const StaffProductMainCreateRoute: INavRoute = {
  ...StaffProductMainCreateNavRoute,
  component: StaffProductMainCreateComponent,
};
