import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { OwnerProduct, OwnerProductCollection } from '@app/collections/owner/product.collection';
import { OwnerAuthService } from '@app/core/services/owner/auth.service';
import { MetalQueryFilters } from '@lib/metal-data';
import { get } from 'lodash';

@Component({
  selector: 'aka-select-product',
  templateUrl: './select-product.component.html',
  styleUrls: ['./select-product.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectProductComponent),
      multi: true,
    },
  ],
})
export class SelectProductComponent implements ControlValueAccessor {
  _loading = false;
  _class: string;
  customFilter: MetalQueryFilters<OwnerProduct> = { where: { restaurant_id: this.auth.currentRestaurant.id } };
  params: any = { include: 'variants.variant' };

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

  @Output() change = new EventEmitter<any>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onChange: (_: any) => void = () => null;
  onTouched = () => {};

  constructor(public collection: OwnerProductCollection, private auth: OwnerAuthService) {}

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
