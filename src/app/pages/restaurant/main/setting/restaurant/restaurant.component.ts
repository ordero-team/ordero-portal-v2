import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OwnerRestaurant, OwnerRestaurantCollection } from '@app/collections/owner/restaurant.collection';
import { appIcons } from '@app/core/helpers/icon.helper';
import { INavRoute } from '@app/core/services/navigation.service';
import { OwnerAuthService } from '@app/core/services/owner/auth.service';
import { ToastService } from '@app/core/services/toast.service';
import { OwnerFetchMeAction } from '@app/core/states/owner/owner.actions';
import { OwnerState } from '@app/core/states/owner/owner.state';
import { DialogConfirmComponent } from '@app/shared/components/dialog-confirm/dialog-confirm.component';
import { Form, FormRecord } from '@lib/form';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'aka-setting-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss'],
})
export class SettingRestaurantComponent implements OnInit {
  @Form({
    name: 'required|alphaNumSpace',
    description: '',
    website: '',
    phone: '',
  })
  formData: FormRecord;
  record: OwnerRestaurant;

  logo: File | null;
  logoTemp: File | null;

  banner: File | null;
  bannerTemp: File | null;

  @Select(OwnerState.currentRestaurant) currentResstaurant$: Observable<OwnerRestaurant>;

  constructor(
    private collection: OwnerRestaurantCollection,
    private toast: ToastService,
    private auth: OwnerAuthService,
    private dialog: MatDialog,
    private store: Store
  ) {
    this.currentResstaurant$.pipe(untilDestroyed(this)).subscribe((user) => {
      if (user) {
        this.record = user;
        this.applyData();
      }
    });
  }

  async ngOnInit() {
    await this.applyData();
  }

  async applyData() {
    await this.store.dispatch([new OwnerFetchMeAction()]);

    if (this.record.logo_url) {
      this.logo = this.record.logo_url as any;
      this.logoTemp = this.logo;
    }

    if (this.record.banner_url) {
      this.banner = this.record.banner_url as any;
      this.bannerTemp = this.banner;
    }

    this.formData.$import({ ...this.record });
  }

  setImage(type: 'logo' | 'banner', event) {
    this[type] = event;
  }

  removeImage(type: 'logo' | 'banner') {
    if (typeof this[type] === 'string') {
      const delRef = this.dialog.open(DialogConfirmComponent, {
        data: {
          title: `Delete ${type === 'logo' ? 'Logo' : 'Banner'}`,
          message: `Are you sure?`,
          showConfirm: true,
          confirmLabel: 'Delete',
          confirmColor: 'warn',
          showWarning: false,
          class: 'min-w-60',
        },
      });

      delRef.afterClosed().subscribe(async (result) => {
        if (result) {
          try {
            await this.collection.deleteAvatar(type);
            this.toast.info('Profile Picture deleted successfully!');

            if (type === 'logo') {
              this.logo = null;
              this.logoTemp = null;
            }

            if (type === 'banner') {
              this.banner = null;
              this.bannerTemp = null;
            }

            // await this.auth.fetchMe();
            this.applyData();
          } catch (error) {
            this.toast.error({ title: 'Error', detail: 'Something went wrong' }, error);
          }
        }
      });
    } else {
      this.logo = null;
      this.logoTemp = null;

      this.banner = null;
      this.bannerTemp = null;
    }
  }

  async submit() {
    this.formData.$loading = true;
    try {
      await this.collection.update('', this.formData.$payload, { prefix: 'owner' });

      if (this.logoTemp !== this.logo && this.logo !== null) {
        const resImg = await this.collection.updateAvatar('logo', this.logo);
        this.logo = this.logoTemp = resImg.logo_url as any;
      }

      if (this.bannerTemp !== this.banner && this.banner !== null) {
        const resImg = await this.collection.updateAvatar('banner', this.banner);
        this.banner = this.bannerTemp = resImg.banner_url as any;
      }

      this.applyData();
      this.toast.info('Personal Info updated successfully');
    } catch (error) {
      this.toast.error({ title: 'Error', detail: 'Something went wrong' }, error);
    }
    this.formData.$loading = false;
  }
}

export const RestaurantSettingRestaurantNavRoute: INavRoute = {
  path: 'restaurant',
  name: 'restaurant.setting.restaurant',
  title: 'setting.restaurant.parent',
  icon: appIcons.storefrontOutline,
};

export const RestaurantSettingRestaurantRoute: INavRoute = {
  ...RestaurantSettingRestaurantNavRoute,
  component: SettingRestaurantComponent,
};
