import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OwnerRestaurant, OwnerRestaurantCollection } from '@app/collections/owner/restaurant.collection';
import { appIcons } from '@app/core/helpers/icon.helper';
import { INavRoute } from '@app/core/services/navigation.service';
import { OwnerAuthService } from '@app/core/services/owner/auth.service';
import { ToastService } from '@app/core/services/toast.service';
import { OwnerState } from '@app/core/states/owner/owner.state';
import { DialogConfirmComponent } from '@app/shared/components/dialog-confirm/dialog-confirm.component';
import { Form, FormRecord } from '@lib/form';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Select } from '@ngxs/store';
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

  image: File | null;
  imageTemp: File | null;

  @Select(OwnerState.currentRestaurant) currentResstaurant$: Observable<OwnerRestaurant>;

  constructor(
    private collection: OwnerRestaurantCollection,
    private toast: ToastService,
    private auth: OwnerAuthService,
    private dialog: MatDialog
  ) {
    this.currentResstaurant$.pipe(untilDestroyed(this)).subscribe((user) => {
      if (user) {
        this.record = user;
      }
    });
  }

  ngOnInit() {
    // if (this.record.avatar?.original) {
    //   this.image = this.record.avatar.original;
    //   this.imageTemp = this.image;
    // }

    this.applyData();
  }

  applyData() {
    this.formData.$import({ ...this.record });
  }

  setImage(event) {
    this.image = event;
  }

  removeImage() {
    if (typeof this.image === 'string') {
      const delRef = this.dialog.open(DialogConfirmComponent, {
        data: {
          title: `Delete Avatar`,
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
            // await this.collection.deleteAvatar();
            // this.toast.info('Profile Picture deleted successfully!');
            // this.image = null;
            // this.imageTemp = null;
            // await this.auth.fetchMe();
            this.applyData();
          } catch (error) {
            this.toast.error({ title: 'Error', detail: 'Something went wrong' }, error);
          }
        }
      });
    } else {
      this.image = null;
      this.imageTemp = null;
    }
  }

  async submit() {
    this.formData.$loading = true;
    try {
      await this.collection.update('', this.formData.$payload);

      // if (this.imageTemp !== this.image && this.image !== null) {
      //   const resImg = await this.collection.updateAvatar(this.image);
      //   await this.auth.fetchMe();
      //   this.applyData();
      //   this.image = this.imageTemp = resImg.avatar.original;
      // }

      await this.auth.fetchMe();
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
