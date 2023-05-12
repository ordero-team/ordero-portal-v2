import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AkaUtilsService {
  /**
   * Constructor
   */
  constructor() {}

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Generates a random id
   *
   * @param length
   */
  randomId(length = 10): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let name = '';

    for (let i = 0; i < length; i++) {
      name += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return name;
  }
}
