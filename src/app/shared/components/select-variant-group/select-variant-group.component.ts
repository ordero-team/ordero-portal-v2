import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { OwnerProfile } from '@app/collections/owner/profile.collection';
import { OwnerVariantGroup, OwnerVariantGroupCollection } from '@app/collections/owner/variant/group.collection';
import { StaffProfile } from '@app/collections/staff/profile.collection';
import { StaffVariantGroupCollection } from '@app/collections/staff/variant/group.collection';
import { MetalRequestParams } from '@lib/metal-data';
import { get } from 'lodash';

@Component({
  selector: 'aka-select-variant-group',
  templateUrl: './select-variant-group.component.html',
  styleUrls: ['./select-variant-group.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectVariantGroupComponent),
      multi: true,
    },
  ],
})
export class SelectVariantGroupComponent implements OnInit, ControlValueAccessor {
  _loading = false;
  _class: string;
  locations: OwnerVariantGroup[];
  params: MetalRequestParams;

  _value: any;
  _disabled: boolean;

  @Input() name: string;
  @Input() label?: string;
  @Input() placeholder?: string;
  @Input() required?: boolean;
  @Input() disabled?: boolean;
  @Input() clearable = true;

  @Input()
  get fieldClass() {
    return `${this._loading ? 'loading' : ''} ${this._class}`;
  }

  set fieldClass(value) {
    this._class = value;
  }

  @Input() user: OwnerProfile | StaffProfile = null;

  @Output() change = new EventEmitter<any>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onChange: (_: any) => void = () => null;
  onTouched = () => {};

  get groupCollection() {
    return this.user.role.name === 'owner' ? this.collection : this.staffCol;
  }

  constructor(public collection: OwnerVariantGroupCollection, private staffCol: StaffVariantGroupCollection) {}

  ngOnInit(): void {
    this.params = { where: { restaurant_id: this.user.restaurant.id } };
  }

  public writeValue(value: any): void {
    this._value = value;
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this._disabled = isDisabled;
  }

  selectionChange(e: any) {
    this._value = get(e, 'value', null);
    this.onChange(this._value);
    this.change.emit(this._value);
  }
}
