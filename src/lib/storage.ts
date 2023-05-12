import { Encryptor } from '@lib/encryptor';
import { forIn, startsWith } from 'lodash';

const APP_PREFIX = 'kp_aka_';
const encryptor = new Encryptor('keeppack2021');

export class LocalStorage {
  static getLength() {
    return localStorage.length;
  }

  static setItem(key: string, value: any) {
    if (value !== 'undefined' && typeof value !== 'undefined' && value !== null) {
      localStorage.setItem(`${APP_PREFIX}${key}`, encryptor.encrypt(value));
    } else {
      LocalStorage.removeItem(key);
    }
  }

  static getItem(key: string) {
    const val = localStorage.getItem(`${APP_PREFIX}${key}`);
    if (val === null) {
      return null;
    }

    return encryptor.decrypt(val);
  }

  static removeItem(key: string) {
    localStorage.removeItem(`${APP_PREFIX}${key}`);
  }

  static clear() {
    forIn(window.localStorage, (value: any, objKey: string) => {
      if (true === startsWith(objKey, APP_PREFIX)) {
        window.localStorage.removeItem(objKey);
      }
    });
  }

  /** Tests that localStorage exists, can be written to, and read from. */
  static testLocalStorage() {
    const testValue = 'testValue';
    const testKey = 'testKey';
    const errorMessage = 'localStorage did not return expected value';

    LocalStorage.setItem(testKey, testValue);
    const retrievedValue = LocalStorage.getItem(testKey);
    LocalStorage.removeItem(testKey);

    if (retrievedValue !== testValue) {
      throw new Error(errorMessage);
    }
  }
}
