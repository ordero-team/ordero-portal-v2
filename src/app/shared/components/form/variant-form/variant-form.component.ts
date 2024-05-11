import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OwnerVariant, OwnerVariantCollection } from '@app/collections/owner/variant.collection';
import { OwnerAuthService } from '@app/core/services/owner/auth.service';
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

  @Output() onClose: EventEmitter<boolean> = new EventEmitter();
  @Output() onSuccess: EventEmitter<OwnerVariant> = new EventEmitter();

  get isEdit() {
    return has(this.record, 'id');
  }

  constructor(private collection: OwnerVariantCollection, private auth: OwnerAuthService, private toast: ToastService) {}

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
    try {
      let res = null;

      const payload = {
        ...this.formData.$payload,
        group_id: get(this.formData.$payload, 'group.id', null),
        restaurant_id: this.auth.currentRestaurant.id,
      };

      if (has(this.record, 'id')) {
        res = await this.collection.update(this.record.id, payload);
        this.toast.info(`Table successfully updated`);
      } else {
        res = await this.collection.create(payload);
        this.toast.info(`Table ${res.name} successfully created`);
      }

      this.onSuccess.emit(res);
    } catch (error) {
      this.toast.error('Something bad happened', error);
    }
  }
}
