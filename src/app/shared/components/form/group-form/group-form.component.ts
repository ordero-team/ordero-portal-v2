import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OwnerVariantGroup, OwnerVariantGroupCollection } from '@app/collections/owner/variant/group.collection';
import { OwnerAuthService } from '@app/core/services/owner/auth.service';
import { ToastService } from '@app/core/services/toast.service';
import { Form, FormRecord } from '@lib/form';
import { get, has } from 'lodash';

@Component({
  selector: 'aka-group-form',
  templateUrl: './group-form.component.html',
  styleUrls: ['./group-form.component.scss'],
})
export class GroupFormComponent implements OnInit {
  @Form({
    name: 'required|alphaNumSpace',
    type: 'required',
    is_required: '',
  })
  formData: FormRecord;

  types = [
    { value: 'single', label: 'Single' },
    { value: 'multiple', label: 'Multiple' },
  ];

  _record: OwnerVariantGroup = null;
  @Input()
  get record(): OwnerVariantGroup {
    return this._record;
  }

  set record(val) {
    if (this.record !== val) {
      this._record = val;
    }
  }

  @Output() onClose: EventEmitter<boolean> = new EventEmitter();
  @Output() onSuccess: EventEmitter<OwnerVariantGroup> = new EventEmitter();

  get isEdit() {
    return has(this.record, 'id');
  }

  constructor(
    private collection: OwnerVariantGroupCollection,
    private auth: OwnerAuthService,
    private toast: ToastService
  ) {}

  ngOnInit() {
    if (!this.isEdit) {
      this.record = null;
      this.formData.$import({
        name: null,
        type: null,
        is_required: false,
      });
    } else {
      this.formData.$import({
        name: this.record.name,
        type: this.record.type,
        is_required: this.record.required,
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
          required: get(this.formData.$payload, 'is_required'),
          restaurant_id: this.auth.currentRestaurant.id,
        });
        this.toast.info(`Variant Group successfully updated`);
      } else {
        res = await this.collection.create({
          ...this.formData.$payload,
          required: get(this.formData.$payload, 'is_required'),
          restaurant_id: this.auth.currentRestaurant.id,
        });
        this.toast.info(`Variant Group ${res.name} successfully created`);
      }

      this.onSuccess.emit(res);
    } catch (error) {
      this.toast.error('Something bad happened', error);
    }
  }
}
