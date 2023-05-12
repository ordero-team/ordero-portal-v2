import { Directive, ElementRef, Input, OnInit } from '@angular/core';

/**
 * A directive to focus to the component with a delayed time to make sure the element
 * is focused after rendered.
 *
 * @example
 *
 * <input type="text" akaAutofocus>
 */
@Directive({
  selector: '[akaAutofocus]',
})
export class AutofocusDirective implements OnInit {
  @Input() akaAutofocus: boolean | string;

  constructor(private elem: ElementRef) {}

  get isAuto() {
    return typeof this.akaAutofocus === 'string' ? true : this.akaAutofocus;
  }

  ngOnInit() {
    setTimeout(() => {
      if (this.isAuto) {
        if (typeof (this.elem as any).focus === 'function') {
          (this.elem as any).focus();
        } else {
          this.elem.nativeElement.focus();
        }
      }
    }, 200);
  }
}
