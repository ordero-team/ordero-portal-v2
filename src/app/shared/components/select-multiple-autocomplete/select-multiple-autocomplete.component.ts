import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, startWith } from 'rxjs/operators';

interface IMultipleOption {
  label: string;
  value: string;
  selected?: boolean;
}

@Component({
  selector: 'aka-select-multiple-autocomplete',
  templateUrl: './select-multiple-autocomplete.component.html',
  styleUrls: ['./select-multiple-autocomplete.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectMultipleAutocompleteComponent),
      multi: true,
    },
  ],
})
export class SelectMultipleAutocompleteComponent implements OnInit, OnChanges, AfterViewInit, ControlValueAccessor {
  selectData: IMultipleOption[] = [];

  inputCtrl = new FormControl();
  filteredOptions: IMultipleOption[] = [];
  filteredData: Observable<IMultipleOption[]>;
  filterString = '';

  trigger = false;

  _value: any;
  _disabled: boolean;
  _tempOptions: IMultipleOption[];

  @Input() required: boolean;
  @Input() label: string;
  @Input() placeholder = 'Choose Items';
  @Input() class = '';
  @Input() disabled = false;
  @Input() showButtonClose = true;
  @Input() loading = false;
  @Input() options: IMultipleOption[] = [];
  @Input() selected: string[] = [];

  @Output() change? = new EventEmitter<any>();
  @Output() onClear?: EventEmitter<any> = new EventEmitter();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onChange: (_: any) => void = () => null;
  onTouched = () => {};

  constructor(private cd: ChangeDetectorRef) {
    this.inputCtrl.valueChanges
      .pipe(startWith(''), debounceTime(400), distinctUntilChanged())
      .subscribe((label: string | null) => {
        if (this.trigger) {
          this._filter(label);

          if (this.filteredOptions.length) {
            this.inputCtrl.setErrors(null);
          }
        } else {
          this.trigger = true;
        }
      });
  }

  ngOnChanges(changes: SimpleChanges) {
    setTimeout(() => {
      const options = changes['options'];
      const selected = changes['selected'];

      if (options && options.currentValue !== options.previousValue) {
        const getSelected = this.options.filter((val) => val.selected);
        if (getSelected.length > 0) {
          this.options.forEach((val) => {
            if (getSelected.map((i) => i.value).includes(val.value)) {
              this.toggleSelection({ ...val, selected: false });
            }
          });
        }
      }

      // Clear Selected
      if (selected && selected.currentValue?.length === 0) {
        this.options = this.options?.map((val) => {
          return { ...val, selected: false };
        });
        this.selectData = [];
      }
    }, 0);
  }

  ngOnInit() {}

  ngAfterViewInit(): void {
    this.cd.detectChanges();
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
      this.filteredOptions = this.options?.slice() || [];
    }
  }

  onFocus() {
    if (this.filteredOptions.length === 0) {
      this._filter('');
    } else {
      this._filter(this.inputCtrl.value);
    }
  }

  displayFn = (): string => '';

  optionClicked = (event: Event, data: IMultipleOption): void => {
    event.stopPropagation();
    this.toggleSelection(data);
  };

  toggleSelection(data: IMultipleOption) {
    data.selected = !data.selected;
    if (data.selected === true) {
      this.selectData.push(data);
    } else {
      const i = this.selectData.findIndex((value) => value.value === data.value);
      this.selectData.splice(i, 1);
    }
    // this.inputCtrl.setValue(this.selectData);
    this.emitAdjustedData();
  }

  emitAdjustedData = (): void => {
    this._value = this.selectData;

    this.onChange(this._value);
    this.change.emit(this._value);
  };

  removeChip = (data: any): void => {
    this.toggleSelection(data);
  };

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

  clear() {
    this.writeValue(null);
    this.inputCtrl.setValue(null);
    this.onClear.emit(true);
    this.onChange(this.inputCtrl.value);
    this.change.emit(this.inputCtrl.value);
    this._filter('');
  }
}
