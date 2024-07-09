import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OwnerCategory, OwnerCategoryCollection } from '@app/collections/owner/category.collection';
import { OwnerProfile } from '@app/collections/owner/profile.collection';
import { StaffCategoryCollection } from '@app/collections/staff/category.collection';
import { StaffProfile } from '@app/collections/staff/profile.collection';
import { OwnerAuthService } from '@app/core/services/owner/auth.service';
import { ToastService } from '@app/core/services/toast.service';
import { Form, FormRecord } from '@lib/form';
import { has } from 'lodash';

@Component({
  selector: 'aka-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss'],
})
export class CategoryFormComponent implements OnInit {
  @Form({
    name: 'required|alphaNumSpace',
  })
  formData: FormRecord;

  _record: OwnerCategory = null;
  @Input()
  get record(): OwnerCategory {
    return this._record;
  }

  set record(val) {
    if (this.record !== val) {
      this._record = val;
    }
  }

  @Input() user: OwnerProfile | StaffProfile = null;

  @Output() onClose: EventEmitter<boolean> = new EventEmitter();
  @Output() onSuccess: EventEmitter<OwnerCategory> = new EventEmitter();

  get isEdit() {
    return has(this.record, 'id');
  }

  get isOwner() {
    return this.user.role.name === 'owner';
  }

  constructor(
    private collection: OwnerCategoryCollection,
    private staffCol: StaffCategoryCollection,
    private auth: OwnerAuthService,
    private toast: ToastService
  ) {}

  ngOnInit() {
    if (!this.isEdit) {
      this.record = null;
      this.formData.$import({
        name: null,
      });
    } else {
      this.formData.$import({
        name: this.record.name,
      });
    }
  }

  cancel() {
    this.onClose.emit(true);
  }

  async execute() {
    this.formData.$loading = true;
    try {
      let res = null;

      if (has(this.record, 'id')) {
        if (this.isOwner) {
          res = await this.collection.update(this.record.id, {
            ...this.formData.$payload,
            restaurant_id: this.user.restaurant.id,
          });
        } else {
          res = await this.staffCol.update(this.record.id, {
            ...this.formData.$payload,
            restaurant_id: this.user.restaurant.id,
          });
        }

        this.toast.info(`Category successfully updated`);
      } else {
        if (this.isOwner) {
          res = await this.collection.create({ ...this.formData.$payload, restaurant_id: this.user.restaurant.id });
        } else {
          res = await this.staffCol.create({ ...this.formData.$payload, restaurant_id: this.user.restaurant.id });
        }
        this.toast.info(`Category ${res.name} successfully created`);
      }

      this.onSuccess.emit(res);
    } catch (error) {
      this.toast.error('Something bad happened', error);
    } finally {
      this.formData.$loading = false;
    }
  }
}
