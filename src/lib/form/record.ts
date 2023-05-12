import { flatten, nullify } from '@lib/flat';
import { BaseResource } from '@lib/resource';
import { isEqual, isObject, transform } from 'lodash';

interface IFormConfig {
  rules?: any;
  defaults?: any;
  form?: any;
  loading?: boolean;
  deleting?: boolean;
  service?: BaseResource;
}

export class FormRecord {
  [key: string]: any;

  private __ref__: IFormConfig;

  get $addMode() {
    // do logic here
    return !this.id;
  }

  get $loading() {
    return this.__ref__.loading;
  }

  set $loading(loading: any) {
    this.__ref__.loading = loading;
  }

  get $deleting() {
    return this.__ref__.deleting;
  }

  set $deleting(deleting: any) {
    this.__ref__.deleting = deleting;
  }

  get $form() {
    return this.__ref__.form;
  }

  set $form(form: any) {
    this.__ref__.form = form;
  }

  get $rules() {
    return this.__ref__.rules;
  }

  get $payload(): any {
    return JSON.parse(JSON.stringify(this));
  }

  get $changes(): any {
    return diff(JSON.parse(JSON.stringify(this)), this.__ref__.defaults);
  }

  get $changed(): boolean {
    return JSON.stringify(this) !== JSON.stringify(this.__ref__.defaults);
  }

  get $invalid(): boolean {
    return this.$form.invalid;
  }

  get $disabled(): boolean {
    return this.$invalid || !this.$changed; // || !this.$forms.dirty;
  }

  $reset() {
    const { defaults } = this.__ref__;
    Object.keys(this).forEach((key) => delete this[key]);
    applyDefaults(this, defaults);

    // if ngForm instance exist
    if (typeof this.$form.resetForm === 'function') {
      this.$form.resetForm();
    }
  }

  $import(defaults: any) {
    if (typeOf(defaults) === 'object') {
      this.__ref__.defaults = Object.assign({}, JSON.parse(JSON.stringify(defaults)));
      applyDefaults(this, this.__ref__.defaults);
    }
  }

  constructor(rules: any, defaults?: any) {
    const config = { rules: {}, defaults: {}, form: {} };

    if (typeOf(rules) === 'object') {
      for (const [key, val] of Object.entries(flatten(rules))) {
        config.rules[key] = val;
      }

      // assign default properties from rules
      Object.assign(config.defaults, nullify(rules));
    }

    if (typeOf(defaults) === 'object') {
      Object.assign(config.defaults, defaults);
    }

    Object.defineProperty(this, '__ref__', { get: () => config });
    applyDefaults(this, config.defaults);
  }
}

function applyDefaults(form: FormRecord, defaults: any) {
  defaults = JSON.parse(JSON.stringify(defaults));

  for (const [key, value] of Object.entries(defaults)) {
    form[key] = value;
  }
}

function typeOf(target: any): string {
  return toString
    .call(target)
    .replace(/[\[\]]+/g, '')
    .replace('object ', '')
    .toLowerCase();
}

export function diff(nextRec: any, prevRec: any) {
  return getChanges(nextRec, prevRec);
}

function getChanges(next: any, prev: any) {
  return transform(next, (result, value, key) => {
    if (!isEqual(value, prev[key])) {
      if (isObject(value) && isObject(prev[key])) {
        result[key] = getChanges(value, prev[key]);
      } else {
        result[key] = value;
      }
    }
  });
}
