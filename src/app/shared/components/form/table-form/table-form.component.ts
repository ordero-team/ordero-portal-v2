import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OwnerTable, OwnerTableCollection } from '@app/collections/owner/table.collection';
import { OwnerAuthService } from '@app/core/services/owner/auth.service';
import { ToastService } from '@app/core/services/toast.service';
import { Form, FormRecord } from '@lib/form';
import { get, has } from 'lodash';

@Component({
  selector: 'aka-table-form',
  templateUrl: './table-form.component.html',
  styleUrls: ['./table-form.component.scss'],
})
export class TableFormComponent implements OnInit {
  @Form({
    number: 'required|alphaNumSpace',
    location: 'required',
    status: 'required',
  })
  formData: FormRecord;

  statuses = [
    { value: 'available', label: 'Available' },
    { value: 'in_use', label: 'In Use' },
    { value: 'reserved', label: 'Reserved' },
    { value: 'unavailable', label: 'Unavailable' },
    { value: 'empty', label: 'Empty' },
  ];

  _record: OwnerTable = null;
  @Input()
  get record(): OwnerTable {
    return this._record;
  }

  set record(val) {
    if (this.record !== val) {
      this._record = val;
    }
  }

  @Output() onClose: EventEmitter<boolean> = new EventEmitter();
  @Output() onSuccess: EventEmitter<OwnerTable> = new EventEmitter();

  get isEdit() {
    return has(this.record, 'id');
  }

  constructor(private collection: OwnerTableCollection, private auth: OwnerAuthService, private toast: ToastService) {}

  ngOnInit() {
    if (!this.isEdit) {
      this.record = null;
      this.formData.$import({
        number: null,
        location: {},
        status: null,
      });
    } else {
      this.formData.$import({
        number: this.record.number,
        location: this.record.location,
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

      if (has(this.record, 'id')) {
        res = await this.collection.update(this.record.id, {
          ...this.formData.$payload,
          location_id: get(this.formData.$payload, 'location.id', null),
          restaurant_id: this.auth.currentRestaurant.id,
        });
        this.toast.info(`Table successfully updated`);
      } else {
        res = await this.collection.create({
          ...this.formData.$payload,
          location_id: get(this.formData.$payload, 'location.id', null),
          restaurant_id: this.auth.currentRestaurant.id,
        });
        this.toast.info(`Table ${res.name} successfully created`);
      }

      this.onSuccess.emit(res);
    } catch (error) {
      this.toast.error('Something bad happened', error);
    }
  }
}
