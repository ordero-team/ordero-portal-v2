import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OwnerStaff, OwnerStaffCollection } from '@app/collections/owner/staff.collection';
import { OwnerAuthService } from '@app/core/services/owner/auth.service';
import { ToastService } from '@app/core/services/toast.service';
import { Form, FormRecord } from '@lib/form';
import { get, has } from 'lodash';

@Component({
  selector: 'aka-staff-form',
  templateUrl: './staff-form.component.html',
  styleUrls: ['./staff-form.component.scss'],
})
export class StaffFormComponent implements OnInit {
  @Form({
    name: 'required|alphaNumSpace',
    email: 'required|email',
    phone: 'required|phoneNumber',
    status: 'required',
    role: 'required',
    location: 'required',
  })
  formData: FormRecord;

  statuses = [
    { value: 'active', label: 'Active' },
    { value: 'blocked', label: 'Blocked' },
  ];

  _record: OwnerStaff = null;
  @Input()
  get record(): OwnerStaff {
    return this._record;
  }

  set record(val) {
    if (this.record !== val) {
      this._record = val;
    }
  }

  @Output() onClose: EventEmitter<boolean> = new EventEmitter();
  @Output() onSuccess: EventEmitter<OwnerStaff> = new EventEmitter();

  get isEdit() {
    return has(this.record, 'id');
  }

  constructor(private collection: OwnerStaffCollection, private auth: OwnerAuthService, private toast: ToastService) {}

  ngOnInit() {
    if (!this.isEdit) {
      this.record = null;
      this.formData.$import({
        name: null,
        email: null,
      });
    } else {
      console.log(this.record);
      this.formData.$import({
        name: this.record.name,
        email: this.record.email,
        phone: this.record.phone,
        status: this.record.status,
        role: { id: this.record.role.id, slug: this.record.role.name },
        location: this.record.location,
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
        role_id: get(this.formData.$payload, 'role.id', null),
        location_id: get(this.formData.$payload, 'location.id', null),
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
    } finally {
      this.formData.$loading = false;
    }
  }
}
