import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import * as extractedTailwindConfigStyle from '../../styles/core/tailwind-config.scss';

@Injectable()
export class AkaTailwindService {
  private _tailwindConfig: ReplaySubject<any> = new ReplaySubject<any>(1);

  /**
   * Constructor
   */
  constructor() {
    // Prepare the config object
    const config = {};

    // Extract the style from the class
    const regexpForClass = /\.aka-tailwind-extracted-config\s\{([\s\S]*)\}/g;
    const style = regexpForClass.exec(extractedTailwindConfigStyle.default)[1].trim();

    // Extract the rules
    const regexp = /(--[\s\S]*?):'([\s\S]*?)';/g;
    let rules = regexp.exec(style);

    // Add to the config
    while (rules !== null) {
      const configGroup = /--([\s\S]*?)-/g.exec(rules[1])[1];
      if (!config[configGroup]) {
        config[configGroup] = {};
      }

      config[configGroup][rules[1].replace(/(--[\s\S]*?-)/g, '')] = rules[2];
      rules = regexp.exec(style);
    }

    // Execute the observable with the config
    this._tailwindConfig.next(config);
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  /**
   * Getter for _tailwindConfig
   */
  get tailwindConfig$(): Observable<any> {
    return this._tailwindConfig.asObservable();
  }
}
