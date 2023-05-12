import {
  Component,
  ContentChild,
  Directive,
  EventEmitter,
  forwardRef,
  Input,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import {
  MatAutocomplete,
  MatAutocompleteActivatedEvent,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { ToastService } from '@cs/toast.service';
import { MetalCollection, MetalQueryFilters, MetalRequestOptions, MetalRequestParams } from '@lib/metal-data';
import { IRestOptions } from '@lib/resource';
import { find, get, isEmpty } from 'lodash';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';

@Directive({ selector: '[akaDropOption]' })
export class DropOptionDirective {}

/**
 * A form input component with autocomplete that will pull the data from Algolia.
 * The usage is almost the same with `[matInput]`, with additional properties
 * to define how the component will pull the data from Algolia.
 *
 * @example
 *
 */
@Component({
  selector: 'aka-api-autocomplete',
  templateUrl: './api-autocomplete.component.html',
  styleUrls: ['./api-autocomplete.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ApiAutocompleteComponent),
      multi: true,
    },
  ],
})
export class ApiAutocompleteComponent implements ControlValueAccessor {
  activated: MatAutocompleteActivatedEvent;
  loading = false;
  trigger = true;
  value: any;
  records: any[] = [];
  tempRecords: any[] = [];
  inputCtrl = new FormControl();

  /** Property to add a label to the input **/
  @Input() inputLabel = 'Search';

  @Input() label: string | string[] = 'name';
  @Input() fieldValue: string;
  /** Property to sort options/records **/
  @Input() sortBy = '';
  /** Property to limit records **/
  @Input() limit = 25;

  /** Property to define does the input is required or not **/
  @Input() required: boolean;
  /** Property to define the input placeholder, displayed above the input. */
  @Input() placeholder: string;
  /** Property to define which collection will be used to pull the data. **/
  @Input() collection: MetalCollection<any>;
  /** Property to add custom params to the filter request **/
  @Input() customFilter: MetalQueryFilters<any> = {};
  /** Property to add custom params to the filter request **/
  @Input() customParams: MetalRequestParams = {};
  /** Property to add custom params to the filter request **/
  @Input() customRequestOption: MetalRequestOptions = {};
  /** Extra class to be added to the component. */
  @Input() class?: string;
  /** Extra class to be added to the its dropdown component. */
  @Input() panelClass?: string;
  /** Input hint that will be displayed below the input. */
  @Input() hint?: string;
  /** Event emitter that will be triggered when value changed. */
  /** Property to add first Option value when value is empty  */
  @Input() selectedFirst?: boolean = false;

  @Output() change?: EventEmitter<any> = new EventEmitter();
  @Output() onClear?: EventEmitter<any> = new EventEmitter();

  @Input() suffixIcon?: string = '';
  @Input() withPrefix?: boolean = true;
  @Input() prefixIcon?: string = '';
  @Input() withCustomValue?: boolean = false;

  /** Property to add custom params to the filter request **/
  @Input() customOptions?: IRestOptions;
  @Input() autoSelectedFirst?: boolean;

  @Input() autofocus: boolean;
  @Input() clearable = true;

  @ViewChild(MatAutocomplete) autocomplete: MatAutocomplete;

  /** A template ref that will help the component to render how the dropdown items looks like. */
  @ContentChild(DropOptionDirective, { read: TemplateRef, static: true }) valOption: DropOptionDirective;

  private get _selected() {
    return typeof this.value === 'object' && Object.keys(this.value || {}).length;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onChange = (_: any) => {};
  onTouched = () => {};

  constructor(private toast: ToastService) {
    this.inputCtrl.valueChanges
      .pipe(
        filter((res) => res.length > 2 || res === ''),
        debounceTime(400),
        distinctUntilChanged()
      )
      .subscribe(async (val: string | null) => {
        if (this.trigger) {
          if (val === '' || val === null) {
            this.records = [];
          } else {
            await this._filter(val);
          }

          this.activated = null;
          if (!this.records.length) {
            if (this.withCustomValue) {
              this.setCustomValue(val);
            } else {
              this.inputCtrl.setErrors({ incorrect: true });
              this.value = null;
              this.onChange(this.value);
              this.change.emit({ value: null });
            }
          } else {
            this.inputCtrl.setErrors(null);
            if (!this.withCustomValue) {
              setTimeout(() => {
                if (this.autocomplete.options.first) {
                  this.activated = { option: this.autocomplete.options.first } as any;
                }
              }, 100);
            }
          }
        } else {
          if ((this.selectedFirst && val == '') || val == null) {
            if (this.fieldValue != null || this.fieldValue != '') {
              await this._filter();
              setTimeout(() => {
                this.writeValue(this.autocomplete.options.first.value[this.fieldValue]);
              }, 100);
            } else {
              this.loading = false;
              this.trigger = true;
            }
          } else if (!this.selectedFirst) {
            this.trigger = false;
            this.loading = false;
          }
          this.trigger = true;
          this.loading = false;
        }
      });
  }

  activate(event: MatAutocompleteActivatedEvent) {
    this.activated = event;
    this.value = null;
  }

  autoselect() {
    if (!this._selected && this.inputCtrl.value && this.inputCtrl.dirty && this.activated && !this.withCustomValue) {
      this.selected(this.activated);
    } else if (!this._selected && this.withCustomValue && this.inputCtrl.value) {
      this.setCustomValue(this.inputCtrl.value);
    }
  }

  async onFocus() {
    if (this.records.length === 0) {
      await this._filter();
    }

    if (this.value) {
      if (this.tempRecords.length > 0) {
        this.records = this.tempRecords;
      }
    }
  }

  blur() {
    if (this.inputCtrl.invalid) {
      this.value = null;
      this.activated = null;
      this.onChange(this.value);
      this.change.emit({ value: null });
    }
  }

  /** Check Angular docs for more info about this implementation. */
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  /** Check Angular docs for more info about this implementation. */
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  /** Check Angular docs for more info about this implementation. */
  writeValue(value: any | null | undefined) {
    if (typeof value === 'string') {
      this.value = value;
    }

    if (typeof value === 'object') {
      this.value = { ...(value || {}) };
    }

    this.setValue();
  }

  /** Check Angular docs for more info about this implementation. */
  setDisabledState(disabled: boolean): void {
    if (disabled) {
      this.inputCtrl.disable();
    } else {
      this.inputCtrl.enable();
    }
  }
  /**
   * A method to set the new value and propagate its change.
   */
  async setValue() {
    let val = this.value;

    if (this.records.length === 0 && !isEmpty(val)) {
      await this._filter();
    }

    if (typeof this.label === 'string') {
      if (typeof this.value === 'string') {
        // Auto Select by field
        if (typeof this.fieldValue === 'string') {
          this.value = find(this.tempRecords, [this.fieldValue, this.value]);

          this.onChange(this.value);
          this.change.emit({ value: this.value });
        } else {
          val = this.value;
        }
      }

      if (typeof this.value === 'object') {
        val = get(this.value, this.label, '');
      }
    } else if (Array.isArray(this.label) && Array.isArray(this.value)) {
      val = this.label
        .map((key) => this.value[key])
        .filter((value) => value)
        .join(' ');
    }

    this.inputCtrl.setValue(val);
    this.trigger = false;
  }

  /**
   * A method to trigger change event so component that use it can add a custom handler
   * for the changes.
   * @param event - An event object comes from the mat autocomplete component.
   */
  selected(event: MatAutocompleteSelectedEvent): void {
    const { value } = event.option;
    this.value = value;
    this.activated = null;
    this.onChange(value);
    this.change.emit({ value, event });
    this.setValue();
  }

  setCustomValue(val: any) {
    this.inputCtrl.setErrors(null);
    this.value = val;

    this.onChange(this.value);
    this.change.emit(this.value);

    this.setValue();
    this.trigger = true;
  }

  clear() {
    this.writeValue('');
    this.inputCtrl.setValue('');
    this.onClear.emit(true);
    this.records = this.tempRecords;
  }

  /**
   * A method to add a loading indicator and pull the data from API.
   * @param query
   * @private
   */
  public async _filter(query = ''): Promise<any> {
    try {
      const filter = { limit: this.limit, search: query };

      const reqFilter: MetalQueryFilters<any> = Object.assign({}, filter, this.customFilter);
      const reqParams: any = Object.assign({}, this.customParams || {});

      this.loading = true;
      // this.records = await this.collection.search(query, reqParams, this.customOptions);
      this.records = await this.collection.find(reqFilter, {
        params: { ...reqParams, per_page: 50 },
        ...this.customRequestOption,
      });

      if (query === '') {
        this.tempRecords = JSON.parse(JSON.stringify(this.records));
      }

      if (this.autoSelectedFirst && this.autocomplete.options.length === 1) {
        this.autocomplete.options.first.select();
      }

      this.loading = false;
    } catch (error) {
      this.trigger = true;
      this.toast.error('Something bad happened!', error);
    }
  }
}
