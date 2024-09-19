import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OwnerProfile } from '@app/collections/owner/profile.collection';
import { OwnerStock, OwnerStockCollection } from '@app/collections/owner/stock.collection';
import { OwnerTable } from '@app/collections/owner/table.collection';
import { StaffProfile } from '@app/collections/staff/profile.collection';
import { StaffStockCollection } from '@app/collections/staff/stock.collection';
import { OwnerAuthService } from '@app/core/services/owner/auth.service';
import { StaffAuthService } from '@app/core/services/staff/auth.service';
import { ToastService } from '@app/core/services/toast.service';
import { Form, FormRecord } from '@lib/form';
import { get, has } from 'lodash';

@Component({
  selector: 'aka-edit-stock-form',
  templateUrl: './edit-stock-form.component.html',
  styleUrls: ['./edit-stock-form.component.scss'],
})
export class EditStockFormComponent implements OnInit {
  @Form({
    location: 'required',
    onhand: 'required',
  })
  formData: FormRecord;

  _record: OwnerStock = null;
  @Input()
  get record(): OwnerStock {
    return this._record;
  }

  set record(val) {
    if (this.record !== val) {
      this._record = val;
    }
  }

  @Input() user: OwnerProfile | StaffProfile;

  @Output() onClose: EventEmitter<boolean> = new EventEmitter();
  @Output() onSuccess: EventEmitter<OwnerStock> = new EventEmitter();

  get isEdit() {
    return has(this.record, 'id');
  }

  get isOwner() {
    return this.user && this.user.role.name === 'owner';
  }

  get ownerLocation() {
    return (this.auth.currentUser && this.auth.currentUser.location) || null;
  }

  get staffLocation() {
    return (this.staff.currentUser && this.staff.currentUser.location) || null;
  }

  constructor(
    private auth: OwnerAuthService,
    private staff: StaffAuthService,
    private toast: ToastService,
    private collection: OwnerStockCollection,
    private staffCol: StaffStockCollection
  ) {}

  ngOnInit() {
    this.formData.$import({
      location: this.record.location,
      onhand: this.record.onhand,
    });
  }

  cancel() {
    this.formData.$import({});
    this.onClose.emit(true);
  }

  async execute() {
    this.formData.$loading = true;
    try {
      const payload = {
        ...this.formData.$payload,
        location_id:
          this.ownerLocation || this.staffLocation
            ? (this.ownerLocation || this.staffLocation).id
            : get(this.formData.$payload, 'location.id', null),
        restaurant_id: this.user.restaurant.id,
      };

      if (has(this.record, 'id')) {
        if (this.isOwner) {
          await this.collection.update(this.record.id, payload);
        } else {
          payload['location_id'] = this.user.location.id;
          await this.staffCol.update(this.record.id, payload);
        }

        this.toast.info(`Stock successfully updated`);
        this.onSuccess.emit(payload);
      }
    } catch (error) {
      this.toast.error('Something bad happened', error);
    } finally {
      this.formData.$loading = false;
    }
  }
}
