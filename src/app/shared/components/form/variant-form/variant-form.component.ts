import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OwnerProfile } from '@app/collections/owner/profile.collection';
import { OwnerVariant, OwnerVariantCollection } from '@app/collections/owner/variant.collection';
import { StaffProfile } from '@app/collections/staff/profile.collection';
import { StaffVariantCollection } from '@app/collections/staff/variant.collection';
import { ToastService } from '@app/core/services/toast.service';
import { Form, FormRecord } from '@lib/form';
import { get, has } from 'lodash';

@Component({
  selector: 'aka-variant-form',
  templateUrl: './variant-form.component.html',
  styleUrls: ['./variant-form.component.scss'],
})
export class VariantFormComponent implements OnInit {
  @Form({
    name: 'required|alphaNumSpace',
    price: 'required',
    group: 'required',
    status: 'required',
  })
  formData: FormRecord;

  statuses = [
    { value: 'available', label: 'Available' },
    { value: 'unavailable', label: 'Unavailable' },
  ];

  _record: OwnerVariant = null;
  @Input()
  get record(): OwnerVariant {
    return this._record;
  }

  set record(val) {
    if (this.record !== val) {
      this._record = val;
    }
  }

  @Input() user: OwnerProfile | StaffProfile = null;

  @Output() onClose: EventEmitter<boolean> = new EventEmitter();
  @Output() onSuccess: EventEmitter<OwnerVariant> = new EventEmitter();

  get isEdit() {
    return has(this.record, 'id');
  }

  get isOwner() {
    return this.user.role.name === 'owner';
  }

  constructor(
    private collection: OwnerVariantCollection,
    private staffCol: StaffVariantCollection,
    private toast: ToastService
  ) {}

  ngOnInit() {
    if (!this.isEdit) {
      this.record = null;
      this.formData.$import({
        name: null,
        price: 0,
        group: {},
        status: null,
      });
    } else {
      this.formData.$import({
        name: this.record.name,
        price: this.record.price,
        group: this.record.group,
        status: this.record.status,
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

      const payload = {
        ...this.formData.$payload,
        group_id: get(this.formData.$payload, 'group.id', null),
        restaurant_id: this.user.restaurant.id,
      };

      if (has(this.record, 'id')) {
        if (this.isOwner) {
          res = await this.collection.update(this.record.id, payload);
        } else {
          res = await this.staffCol.update(this.record.id, payload);
        }

        this.toast.info(`Table successfully updated`);
      } else {
        if (this.isOwner) {
          res = await this.collection.create(payload);
        } else {
          res = await this.staffCol.create(payload);
        }
        this.toast.info(`Table ${res.name} successfully created`);
      }

      this.onSuccess.emit(res);
    } catch (error) {
      this.toast.error('Something bad happened', error);
    } finally {
      this.formData.$loading = false;
    }
  }
}
