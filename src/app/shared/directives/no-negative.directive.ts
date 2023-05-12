import { Directive, HostListener } from '@angular/core';

@Directive({ selector: '[akaNoNegative]' })
export class NoNegativeDirective {
  constructor() {}

  @HostListener('keypress', ['$event']) onKeydownHandler(event) {
    return event.keyCode !== 45 ? null : event.keyCode >= 48 && event.keyCode <= 57;
  }
}
