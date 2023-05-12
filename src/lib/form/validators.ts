// Taken from https://github.com/sabrio/ng2-validation-manager
import { AbstractControl, ValidatorFn, Validators as NativeValidators } from '@angular/forms';
import { CreditCardValidators } from 'angular-cc-library';
import { isValidPhoneNumber, CountryCode } from 'libphonenumber-js';

export class Validators extends NativeValidators {
  /*** CUSTOM VALIDATIONS ***/

  /**
   * Validator that requires controls to have a value of a range length.
   */
  static alpha(control: AbstractControl): { [key: string]: boolean } {
    if (isPresent(Validators.required(control))) {
      return null;
    }

    const v: string = control.value;
    return /^[A-Za-z]+$/.test(v) ? null : { alpha: true };
  }

  static alphaSpace(control: AbstractControl): { [key: string]: boolean } {
    if (isPresent(Validators.required(control))) {
      return null;
    }

    const v: string = control.value;
    return /^[A-Za-z ]+$/.test(v) ? null : { alphaSpace: true };
  }

  static alphaNum(control: AbstractControl): { [key: string]: boolean } {
    if (isPresent(Validators.required(control))) {
      return null;
    }

    const v: string = control.value;
    return /^[A-Za-z0-9]+$/.test(v) ? null : { alphaNum: true };
  }

  static alphaNumSpace(control: AbstractControl): { [key: string]: boolean } {
    if (isPresent(Validators.required(control))) {
      return null;
    }

    const v: string = control.value;
    return /^[A-Za-z0-9 ]+$/.test(v) ? null : { alphaNumSpace: true };
  }

  static requiredWith(field: any): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control['_parent']) {
        return null;
      }

      const controlRequired = control['_parent'].controls[field];

      return controlRequired.value ? null : { requiredWith: true };
    };
  }

  static requiredWithout(field: any): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control['_parent']) {
        return null;
      }

      const controlRequired = control['_parent'].controls[field];

      return controlRequired.value ? { requiredWithout: true } : null;
    };
  }

  /**
   * Validator that requires controls to have a value of a range length.
   */
  static rangeLength(rangeLength: number[]): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (isPresent(Validators.required(control))) {
        return null;
      }

      const v: string = control.value;
      return v.length >= rangeLength[0] && v.length <= rangeLength[1] ? null : { rangeLength: true };
    };
  }

  /**
   * Validator that requires controls to have a value of a range length.
   */
  static count(len): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (isPresent(Validators.required(control))) {
        return null;
      }

      const v: string = control.value;
      return v.length === len ? null : { count: true };
    };
  }

  /**
   * Validator that requires controls to have a value of a min value.
   */
  static min(min): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (isPresent(Validators.required(control))) {
        return null;
      }

      const v: number = control.value;
      return v >= parseFloat(min) ? null : { min: true };
    };
  }

  /**
   * Validator that requires controls to have a value of a max value.
   */
  static max(max): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (isPresent(Validators.required(control))) {
        return null;
      }

      const v: number = control.value;
      return v <= parseFloat(max) ? null : { max: true };
    };
  }

  /**
   * Validator that requires controls to have a value of a range value.
   */
  static range(range: number[]): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (isPresent(Validators.required(control))) {
        return null;
      }

      const v: number = control.value;
      return v >= range[0] && v <= range[1] ? null : { range: true };
    };
  }

  /**
   * Validator that requires controls to have a value of digits.
   */
  static digits(control: AbstractControl): { [key: string]: boolean } {
    if (isPresent(Validators.required(control))) {
      return null;
    }

    const v: string = control.value;
    return /^\d+$/.test(v) ? null : { digits: true };
  }

  /**
   * Validator that requires controls to have a value of number.
   */
  static number(control: AbstractControl): { [key: string]: boolean } {
    if (isPresent(Validators.required(control))) {
      return null;
    }

    const v: string = control.value;
    return /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(v) ? null : { number: true };
  }

  /**
   * Validator that requires controls to have a value of url.
   */
  static url(control: AbstractControl): { [key: string]: boolean } {
    if (isPresent(Validators.required(control))) {
      return null;
    }

    const v: string = control.value;
    const regex =
      /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i;
    return regex.test(v) ? null : { url: true };
  }

  /**
   * Validator that requires controls to have a value of email.
   */
  static email(control: AbstractControl): { [key: string]: boolean } {
    if (isPresent(Validators.required(control))) {
      return null;
    }
    const v: string = control.value;
    const regex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(v) ? null : { email: true };
  }

  /**
   * Validator that requires controls to have a value of date.
   */
  static date(control: AbstractControl): { [key: string]: boolean } {
    if (isPresent(Validators.required(control))) {
      return null;
    }

    const v: string = control.value;
    return !/Invalid|NaN/.test(new Date(v).toString()) ? null : { date: true };
  }

  /**
   * Validator that requires controls to have a value of minDate.
   */
  static minDate(minDate: any): ValidatorFn {
    if (!isDate(minDate)) {
      throw Error('minDate value must be a formatted date');
    }
    return (control: AbstractControl): { [key: string]: any } => {
      if (isPresent(Validators.required(control))) {
        return null;
      }

      const d: Date = new Date(control.value);

      if (!isDate(d)) {
        return { minDate: true };
      }

      return d >= new Date(minDate) ? null : { minDate: true };
    };
  }

  /**
   * Validator that requires controls to have a value of maxDate.
   */
  static maxDate(maxDate: any): ValidatorFn {
    if (!isDate(maxDate)) {
      throw Error('maxDate value must be a formatted date');
    }
    return (control: AbstractControl): { [key: string]: any } => {
      if (isPresent(Validators.required(control))) {
        return null;
      }
      const d: Date = new Date(control.value);

      if (!isDate(d)) {
        return { maxDate: true };
      }
      return d <= new Date(maxDate) ? null : { maxDate: true };
    };
  }

  /**
   * Validator that requires controls to have a value of dateISO.
   */
  static dateISO(control: AbstractControl): { [key: string]: boolean } {
    if (isPresent(Validators.required(control))) {
      return null;
    }

    const v: string = control.value;
    return /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(v) ? null : { dateISO: true };
  }

  /**
   * Validator that requires controls to have a value of creditCard.
   */
  static creditCard(control: AbstractControl): { [key: string]: boolean } {
    if (isPresent(Validators.required(control))) {
      return null;
    }

    const v: string = control.value;
    const sanitized = v.replace(/[^0-9]+/g, '');

    // problem with chrome
    const regex =
      /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/;
    if (!regex.test(sanitized)) {
      return { creditCard: true };
    }

    let sum = 0;
    let digit;
    let tmpNum;
    let shouldDouble;
    for (let i = sanitized.length - 1; i >= 0; i--) {
      digit = sanitized.substring(i, i + 1);
      tmpNum = parseInt(digit, 10);
      if (shouldDouble) {
        tmpNum *= 2;
        if (tmpNum >= 10) {
          sum += (tmpNum % 10) + 1;
        } else {
          sum += tmpNum;
        }
      } else {
        sum += tmpNum;
      }
      shouldDouble = !shouldDouble;
    }

    if (Boolean(sum % 10 === 0 ? sanitized : false)) {
      return null;
    }

    return { creditCard: true };
  }

  /**
   * Validator that requires controls to have a value of creditCard expiration date.
   */
  static ccExpDate(control: AbstractControl): { [key: string]: boolean } {
    if (isPresent(Validators.required(control))) {
      return null;
    }

    return CreditCardValidators.validateExpDate(control) ? { ccExpDate: true } : null;
  }

  /**
   * Validator that requires controls to have a value of JSON.
   */
  static json(control: AbstractControl): { [key: string]: boolean } {
    if (isPresent(Validators.required(control))) {
      return null;
    }

    const v: string = control.value;

    try {
      const obj = JSON.parse(v);

      if (Boolean(obj) && typeof obj === 'object') {
        return null;
      }
    } catch (e) {}
    return { json: true };
  }

  /**
   * Validator that requires controls to have a value of base64.
   */
  static base64(control: AbstractControl): { [key: string]: boolean } {
    if (isPresent(Validators.required(control))) {
      return null;
    }

    const v: string = control.value;
    return /^(?:[A-Z0-9+\/]{4})*(?:[A-Z0-9+\/]{2}==|[A-Z0-9+\/]{3}=|[A-Z0-9+\/]{4})$/i.test(v) ? null : { base64: true };
  }

  /**
   * Validator that requires controls to have value of phone formatter
   */

  static phoneNumber(locale?: CountryCode): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (isPresent(Validators.required(control))) {
        return null;
      }

      const v: string = control.value;
      const validate = isValidPhoneNumber(v.replace(/[^0-9+]/g, ''), locale || 'US');
      return validate ? null : { phoneNumber: true };
    };
  }

  /**
   * Validator that requires controls to have a value of phone.
   */
  static phone(locale?: string): ValidatorFn {
    const phones = {
      'zh-CN': /^(\+?0?86\-?)?((13\d|14[57]|15[^4,\D]|17[678]|18\d)\d{8}|170[059]\d{7})$/,
      'zh-TW': /^(\+?886\-?|0)?9\d{8}$/,
      'en-ZA': /^(\+?27|0)\d{9}$/,
      'en-AU': /^(\+?61|0)4\d{8}$/,
      'en-HK': /^(\+?852\-?)?[569]\d{3}\-?\d{4}$/,
      'fr-FR': /^(\+?33|0)[67]\d{8}$/,
      'de-DE': /^(\+?49|0)[1-9]\d{10}$/,
      'pt-PT': /^(\+351)?9[1236]\d{7}$/,
      'el-GR': /^(\+?30)?(69\d{8})$/,
      'en-GB': /^(\+?44|0)7\d{9}$/,
      'en-US': /^(\+?1)?[2-9]\d{2}[2-9](?!11)\d{6}$/,
      'en-ZM': /^(\+26)?09[567]\d{7}$/,
      'ru-RU': /^(\+?7|8)?9\d{9}$/,
      'nb-NO': /^(\+?47)?[49]\d{7}$/,
      'nn-NO': /^(\+?47)?[49]\d{7}$/,
      'vi-VN': /^(0|\+?84)?((1(2([0-9])|6([2-9])|88|99))|(9((?!5)[0-9])))([0-9]{7})$/,
      'en-NZ': /^(\+?64|0)2\d{7,9}$/,
      'hu-HU':
        /^(?:\+?(?:36|\(36\)))[ -\/]?(?:(?:(?:(?!1|20|21|30|31|70|90)[2-9][0-9])[ -\/]?\d{3}[ -\/]?\d{3})|(?:(?:1|20|21|30|31|70|90)[ -\/]?\d{3}[ -\/]?\d{2}[ -\/]?\d{2}))$/,
      'nl-NL': /^(^\+[0-9]{2}|^\+[0-9]{2}\(0\)|^\(\+[0-9]{2}\)\(0\)|^00[0-9]{2}|^0)([0-9]{9}$|[0-9\-\s]{10}$)$/,
      'id-ID': /^(^\+62\s?|^0)(\d{3,4}-?){2}\d{3,4}$/,
    };

    return (control: AbstractControl): { [key: string]: any } => {
      if (isPresent(Validators.required(control))) {
        return null;
      }

      const v: string = control.value;
      const pattern = phones[locale] || phones['en-US'];

      return new RegExp(pattern).test(v) ? null : { phone: true };
    };
  }

  /**
   * Validator that requires controls to have a value of uuid.
   */
  static uuid(version?: string): ValidatorFn {
    const uuid = {
      '3': /^[0-9A-F]{8}-[0-9A-F]{4}-3[0-9A-F]{3}-[0-9A-F]{4}-[0-9A-F]{12}$/i,
      '4': /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
      '5': /^[0-9A-F]{8}-[0-9A-F]{4}-5[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
      all: /^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/i,
    };

    return (control: AbstractControl): { [key: string]: any } => {
      if (isPresent(Validators.required(control))) {
        return null;
      }

      const v: string = control.value;
      const pattern = uuid[version] || uuid.all;

      return new RegExp(pattern).test(v) ? null : { uuid: true };
    };
  }

  /**
   * Validator that requires controls to have a value to equal another value.
   */
  static equal(val: any): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (isPresent(Validators.required(control))) {
        return null;
      }

      const v: any = control.value;

      return val === v ? null : { equal: true };
    };
  }

  /**
   * Validator that requires controls to have a value to equal another control.
   */
  static equalTo(equalControlName): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control['_parent']) {
        return null;
      }

      if (!control['_parent'].controls[equalControlName]) {
        throw new TypeError('Form Control ' + equalControlName + ' does not exists.');
      }
      const controlMatch = control['_parent'].controls[equalControlName];

      return controlMatch.value === control.value ? null : { equalTo: true };
    };
  }

  /**
   * Validator that requires controls to have a value to not equal another control.
   */
  static notEqualTo(equalControlName): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control['_parent']) {
        return null;
      }

      if (!control['_parent'].controls[equalControlName]) {
        throw new TypeError('Form Control ' + equalControlName + ' does not exists.');
      }
      const controlMatch = control['_parent'].controls[equalControlName];

      return controlMatch.value !== control.value ? null : { notEqualTo: true };
    };
  }

  static arrayLength(min: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      const v: any = typeof control.value === 'string' ? control.value.split(',') : control.value;
      return (v || []).length >= min ? null : { arrayLength: true };
    };
  }
}

export function isPresent(obj: any): boolean {
  return obj !== undefined && obj !== null;
}

export function isDate(obj: any): boolean {
  return !/Invalid|NaN/.test(new Date(obj).toString());
}

export function ucFirst(str) {
  const firstLetter = str.substr(0, 1);
  return firstLetter.toUpperCase() + str.substr(1);
}

export function isBase64(str) {
  try {
    return btoa(atob(str)) === str;
  } catch (err) {
    return false;
  }
}

// keys must be with lowercase
export const VALIDATION_MESSAGES = {
  required: '%n is required.',
  arraylength: '%n must be at least %0 item.',
  minlength: '%n must be at least %0 characters long.',
  maxlength: '%n cannot be more than %0 characters long.',
  alpha: '%n accepts only alphabetic characters.',
  alphaspace: '%n accepts only alphabetic characters and space.',
  alphanum: '%n accepts only alphabetic characters and numbers.',
  alphanumspace: '%n accepts only alphabetic characters, numbers and space.',
  url: '%n is not valid url.',
  number: '%n is not valid number.',
  digits: '%n is not valid number.',
  creditcard: '%n is not valid credit card.',
  ccexpdate: '%n is not valid expiration date.',
  range: '%n must be between %0 and %1.',
  rangelength: '%n must be between %0 and %1.',
  max: '%n must be equal or lower then %0',
  min: '%n must be equal or higher then %0',
  email: '%n is not valid email.',
  date: '%n is not valid date.',
  mindate: 'The minimum date allowed in %n is %0.',
  maxdate: 'The maximum date allowed in %n is %0.',
  dateiso: '%n is not valid ISO date[yyyy-mm-dd].',
  equal: '%n should be equal to %0.',
  equalto: '%n must be equal to %0.',
  notequalto: '%n must be not equal to %0.',
  json: '%n is not valid json.',
  pattern: '%n does not match the pattern.',
  count: '%n must count %0.',
  phone: 'The %n must be valid phone number format.',
  phonenumber: 'The %n must be valid phone number format.',
};
