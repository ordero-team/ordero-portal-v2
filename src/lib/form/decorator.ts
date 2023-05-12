import { FormRecord } from '@lib/form/record';

export function Form(rules: any, defaults?: any): PropertyDecorator {
  return function decorator(target: object, key: string | symbol) {
    const record = new FormRecord(rules, defaults);

    Object.defineProperty(target, key, {
      get: () => record,
      enumerable: true,
      configurable: true,
    });
  };
}
