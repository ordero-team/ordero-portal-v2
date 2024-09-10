import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OwnerProfile } from '@app/collections/owner/profile.collection';
import { OwnerTable, OwnerTableCollection } from '@app/collections/owner/table.collection';
import { StaffProfile } from '@app/collections/staff/profile.collection';
import { StaffTableCollection } from '@app/collections/staff/table.collection';
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

  @Input() user: OwnerProfile | StaffProfile;

  @Output() onClose: EventEmitter<boolean> = new EventEmitter();
  @Output() onSuccess: EventEmitter<OwnerTable> = new EventEmitter();

  get isEdit() {
    return has(this.record, 'id');
  }

  get isOwner() {
    return this.user && this.user.role.name === 'owner';
  }

  get ownerLocation() {
    return this.auth.currentUser.location || null;
  }

  constructor(
    private collection: OwnerTableCollection,
    private staffCol: StaffTableCollection,
    private auth: OwnerAuthService,
    private toast: ToastService
  ) {}

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
    this.formData.$loading = true;
    try {
      let res = null;

      const payload = {
        ...this.formData.$payload,
        location_id: this.ownerLocation ? this.ownerLocation.id : get(this.formData.$payload, 'location.id', null),
        restaurant_id: this.user.restaurant.id,
      };

      if (has(this.record, 'id')) {
        if (this.isOwner) {
          res = await this.collection.update(this.record.id, payload);
        } else {
          payload['location_id'] = this.user.location.id;
          res = await this.staffCol.update(this.record.id, payload);
        }

        this.toast.info(`Table successfully updated`);
        this.onSuccess.emit(payload);
      } else {
        if (this.isOwner) {
          res = await this.collection.create(payload);
        } else {
          payload['location_id'] = this.user.location.id;
          res = await this.staffCol.create(payload);
        }

        this.toast.info(`Table ${res.number} successfully created`);
        this.onSuccess.emit(res);
      }
    } catch (error) {
      this.toast.error('Something bad happened', error);
    } finally {
      this.formData.$loading = false;
    }
  }
}
