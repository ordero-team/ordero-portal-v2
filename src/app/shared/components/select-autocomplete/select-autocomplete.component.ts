import { Component, EventEmitter, forwardRef, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import {
  MatAutocomplete,
  MatAutocompleteActivatedEvent,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { cloneDeep, isEqual } from 'lodash';
import { debounceTime, distinctUntilChanged, startWith } from 'rxjs/operators';

interface IOption {
  label: string;
  value: string;
}

@Component({
  selector: 'aka-select-autocomplete',
  templateUrl: './select-autocomplete.component.html',
  styleUrls: ['./select-autocomplete.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectAutocompleteComponent),
      multi: true,
    },
  ],
})
export class SelectAutocompleteComponent implements OnChanges, ControlValueAccessor {
  selected: IOption;
  activated: MatAutocompleteActivatedEvent;
  trigger = false;
  inputCtrl = new FormControl();
  filteredOptions: IOption[];
  _loading = false;
  _options: IOption[];
  _tempOptions: any[] = [];
  _innerValue: any = '';

  @Input() required: boolean;
  @Input() label: string;
  @Input() placeholder: string;
  @Input() class?: string;
  @Input() hint?: string;
  @Input() debounceTime = 400;
  @Input() suffixIcon?: string = '';
  @Input() withPrefix: boolean;
  @Output() change?: EventEmitter<any> = new EventEmitter();
  @Output() onClear?: EventEmitter<any> = new EventEmitter();

  @ViewChild(MatAutocomplete) autocomplete: MatAutocomplete;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onChange = (_: any) => {};
  onTouched = () => {};

  @Input()
  get loading() {
    return this._loading;
  }

  set loading(value: any) {
    this._loading = value;

    if (value) {
      this.inputCtrl.disable();
    } else {
      this.inputCtrl.enable();
    }
  }

  @Input()
  get options() {
    return this._options;
  }

  set options(value: IOption[]) {
    this._options = value;
    this._tempOptions = cloneDeep(this._options);
    if (value) {
      this.writeValue(this._innerValue);
    }
  }

  constructor() {
    this.inputCtrl.valueChanges
      .pipe(startWith(''), debounceTime(this.debounceTime), distinctUntilChanged())
      .subscribe((label: string | null) => {
        if (this.trigger) {
          this.selected = null;
          this._filter(label);

          if (this.filteredOptions.length) {
            this.inputCtrl.setErrors(null);

            setTimeout(() => {
              if (this.autocomplete.options.first) {
                this.activated = { option: this.autocomplete.options.first } as any;
              }
            }, 100);
          }
        } else {
          this.trigger = true;
        }
      });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.options && !isEqual(changes.options.previousValue, changes.options.currentValue)) {
      // detect in case options changed
      this.filteredOptions = changes.options.currentValue;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(value: any | null | undefined) {
    this._innerValue = value;
    this.selected = (this.options || []).find((item) => item.value === value);
    this.setValue();
  }

  setDisabledState(disabled: boolean): void {
    if (disabled) {
      this.inputCtrl.disable();
    } else {
      this.inputCtrl.enable();
    }
  }

  onSelect(event: MatAutocompleteSelectedEvent): void {
    const { value } = event.option;

    this.selected = value;
    this.activated = null;
    this.onChange(value.value);
    this.change.emit({ value, event });
    this.setValue();
    this.inputCtrl.markAsUntouched();
  }

  setValue() {
    const { label = '' } = this.selected || {};
    this.inputCtrl.setValue(label);
    // do not trigger observable
    this.trigger = false;
  }

  private _filter(label: string): void {
    if (label) {
      const filterValue = label.toLowerCase();
      this.filteredOptions = this.options.filter((option) => {
        return (
          option.label.toLowerCase().includes(filterValue) ||
          (typeof option.value === 'string' ? option.value.toLowerCase().includes(filterValue) : false)
        );
      });
    } else {
      this.filteredOptions = this.options.slice();
    }
  }

  onActive(event: MatAutocompleteActivatedEvent) {
    this.activated = event;
  }

  autoselect() {
    if (!this.selected && this.inputCtrl.value && this.inputCtrl.dirty) {
      if (this.activated) {
        this.onSelect(this.activated);
      } else if (this.autocomplete.options.first) {
        this.onSelect({ option: this.autocomplete.options.first } as any);
      }
    }
  }

  blur() {
    if (!this.inputCtrl.value || this.inputCtrl.invalid) {
      this.selected = null;
      // this.onChange(null); // @TODO: Disabled because when there is no item selected, its triggered (ngModelChange)
      this.change.emit({ value: {} });
      if (this.required && typeof this.required !== 'undefined') {
        this.inputCtrl.setErrors({ incorrect: true });
      }
    } else {
      if (!this.selected && typeof this.required !== 'undefined') {
        this.inputCtrl.setErrors({ incorrect: false });
      }
    }
  }

  clear() {
    this.writeValue(null);
    this.inputCtrl.setValue(null);
    this.onClear.emit(true);
    this.onChange(this.inputCtrl.value);
    this.change.emit(this.inputCtrl.value);
    this.options = this._tempOptions;
  }
}
