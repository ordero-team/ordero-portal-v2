import { Component, EventEmitter, forwardRef, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { OwnerLocationCollection } from '@app/collections/owner/location.collection';
import { OwnerAuthService } from '@app/core/services/owner/auth.service';
import { ToastService } from '@app/core/services/toast.service';
import { capitalize, map } from 'lodash';

@Component({
  selector: 'aka-select-locations',
  templateUrl: './select-locations.component.html',
  styleUrls: ['./select-locations.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectLocationsComponent),
      multi: true,
    },
  ],
})
export class SelectLocationsComponent implements OnInit, OnChanges, ControlValueAccessor {
  @Input() required: boolean;
  @Input() label: string;
  @Input() placeholder = 'Choose Customer';
  @Input() fieldClass = '';
  @Output() change = new EventEmitter<any>();

  _value: any;
  _disabled: boolean;

  options: any[];
  isLoading: boolean;

  _selected: string[];
  @Input()
  get selected() {
    return this._selected;
  }

  set selected(val: string[]) {
    if (val?.length > 0) {
      this._selected = val;
    } else {
      this._selected = [];
    }
  }

  _status: string;
  @Input()
  get status() {
    return this._status;
  }

  set status(val: string) {
    if (val) {
      this._status = val;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onChange: (_: any) => void = () => null;
  onTouched = () => {};

  constructor(private collection: OwnerLocationCollection, private toast: ToastService, private auth: OwnerAuthService) {}

  async ngOnInit() {
    await this.findData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    setTimeout(async () => {
      const selected = changes['selected'];

      if (selected.currentValue?.length === 0) {
        this.selected = [];
      } else {
        await this.findData(selected.currentValue);
      }
    }, 0);
  }

  async findData(selected = null) {
    this.isLoading = true;
    try {
      const res = await this.collection.find({ where: { restaurant_id: this.auth.currentRestaurant.id } }, {});
      this.options = map(res, (val: { id: string; name: string }) => {
        return {
          label: `${capitalize(val.name)}`,
          value: val.id,
          selected: selected ? selected.includes(val.id) : this.selected?.includes(val.id),
        };
      });
    } catch (error) {
      this.toast.error('Something bad happened', error);
    }
    this.isLoading = false;
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
    this._value = e;

    this.onChange(this._value);
    this.change.emit(this._value);
  }
}
