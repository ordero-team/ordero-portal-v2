/* eslint no-useless-call:"off" */
/* eslint prefer-rest-params:"off" */
/* eslint @typescript-eslint/no-unused-vars:"off" */
import { environment } from '@env/environment';

export class Debug {
  public static debug = environment.debug;
  public static prefix = 'BONBON';
  public static prefixStyle = 'background: #4d4d4d; color: #fff';

  static log(...args) {
    const e: any[] = [];
    for (let t = 0; t < arguments.length; t++) {
      e[t] = arguments[t];
    }
    if (Debug.debug) {
      console.log.apply(console, [`%c ${Debug.prefix} `, ...[Debug.prefixStyle].concat(e)]);
    }
  }

  static warn(...args) {
    const e: any[] = [];
    for (let t = 0; t < arguments.length; t++) {
      e[t] = arguments[t];
    }
    if (Debug.debug) {
      console.warn.apply(console, [`%c ${Debug.prefix} `, ...['background: #d8ab35; color: #fff'].concat(e)]);
    }
  }

  static error(...args) {
    const e: any[] = [];
    for (let t = 0; t < arguments.length; t++) {
      e[t] = arguments[t];
    }
    if (Debug.debug) {
      console.error.apply(console, [`%c ${Debug.prefix} `, ...['background: #d94948; color: #fff'].concat(e)]);
    }
  }

  static isDebug() {
    return Debug.debug;
  }
}
