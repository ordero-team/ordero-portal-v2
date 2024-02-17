import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OwnerProfileCollection } from '@app/collections/owner/profile.collection';
import { OwnerAuthGuardService, OwnerUnverifiedGuardService } from '@app/core/guards/owner-guard.service';
import { INavRoute } from '@app/core/services/navigation.service';
import { OwnerAuthService } from '@app/core/services/owner/auth.service';
import { ToastService } from '@app/core/services/toast.service';
import { OwnerFetchMeAction } from '@app/core/states/owner/owner.actions';
import { Form, FormRecord } from '@lib/form';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Store } from '@ngxs/store';
import { get } from 'lodash';

@UntilDestroy()
@Component({
  selector: 'aka-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss'],
})
export class RestaurantVerifyComponent implements OnInit {
  @Form({
    code: 'required|min:5',
  })
  formData: FormRecord;

  isLoadingResend = false;

  constructor(
    public auth: OwnerAuthService,
    private collection: OwnerProfileCollection,
    private toast: ToastService,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit() {
    this.formData.$reset();
  }

  async resend() {
    this.isLoadingResend = true;
    try {
      await this.collection.resendCode();
      this.toast.info(`New Verification Code has been sent to ${this.auth.currentUser.email}`);
    } catch (error) {
      this.toast.error('Something bad happened', error);
    } finally {
      this.isLoadingResend = false;
    }
  }

  async verify() {
    this.formData.$loading = true;
    try {
      await this.collection.verifyCode(get(this.formData.$payload, 'code'));
      this.toast.info(`Your account has been successfully verified`);
      await this.store.dispatch([new OwnerFetchMeAction()]).toPromise();
      this.auth.toDashboardArea();
    } catch (error) {
      this.toast.error('Something bad happened', error);
    } finally {
      this.formData.$loading = false;
    }
  }
}

export const RestaurantVerifyNavRoute: INavRoute = {
  path: 'verify',
  name: 'auth.verify',
  title: 'auth.verify',
};

export const RestaurantVerifyRoute: INavRoute = {
  ...RestaurantVerifyNavRoute,
  component: RestaurantVerifyComponent,
  canActivate: [OwnerAuthGuardService, OwnerUnverifiedGuardService],
};
