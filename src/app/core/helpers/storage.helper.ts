import { LocalStorage } from '@lib/storage';
import { StorageEngine } from '@ngxs/storage-plugin';

export class AkaStorageEngine implements StorageEngine {
  get length() {
    return LocalStorage.getLength();
  }

  getItem(key: string): any {
    return LocalStorage.getItem(key);
  }

  setItem(key: string, val: any): void {
    LocalStorage.setItem(key, val);
  }

  removeItem(key: string): void {
    LocalStorage.removeItem(key);
  }

  clear(): void {
    LocalStorage.clear();
  }
}
