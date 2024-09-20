import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OwnerLocation, OwnerLocationCollection } from '@app/collections/owner/location.collection';
import { OwnerAuthService } from '@app/core/services/owner/auth.service';
import { ToastService } from '@app/core/services/toast.service';
import { Form, FormRecord } from '@lib/form';
import { has } from 'lodash';

@Component({
  selector: 'aka-location-form',
  templateUrl: './location-form.component.html',
  styleUrls: ['./location-form.component.scss'],
})
export class LocationFormComponent implements OnInit {
  @Form({
    name: 'required|alphaNumSpace',
    address: 'required',
    is_default: 'required',
  })
  formData: FormRecord;

  _record: OwnerLocation = null;
  @Input()
  get record(): OwnerLocation {
    return this._record;
  }

  set record(val) {
    if (this.record !== val) {
      this._record = val;
    }
  }

  @Output() onClose: EventEmitter<boolean> = new EventEmitter();
  @Output() onSuccess: EventEmitter<OwnerLocation> = new EventEmitter();

  get isEdit() {
    return has(this.record, 'id');
  }

  constructor(private collection: OwnerLocationCollection, private auth: OwnerAuthService, private toast: ToastService) {}

  ngOnInit() {
    if (!this.isEdit) {
      this.record = null;
      this.formData.$import({
        name: null,
        address: null,
        is_default: false,
      });
    } else {
      this.formData.$import({
        name: this.record.name,
        address: this.record.address,
        is_default: this.record.is_default,
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
        res = await this.collection.update(this.record.id, {
          ...this.formData.$payload,
          restaurant_id: this.auth.currentRestaurant.id,
        });
        this.toast.info(`Location successfully updated`);
      } else {
        res = await this.collection.create({ ...this.formData.$payload, restaurant_id: this.auth.currentRestaurant.id });
        this.toast.info(`Location ${res.name} successfully created`);
      }

      this.onSuccess.emit(res);
    } catch (error) {
      this.toast.error('Something bad happened', error);
    } finally {
      this.formData.$loading = false;
    }
  }
}
