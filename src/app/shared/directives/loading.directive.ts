import { Directive, ElementRef, HostBinding, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Directive({
  selector: 'button[akaLoading]',
})
export class LoadingDirective implements OnInit, OnChanges {
  @Input('akaLoading') showSpinner: boolean;

  @HostBinding('class')
  elementClass = 'mat-loading-button';

  constructor(private el: ElementRef) {}

  ngOnInit() {
    const btnWrapper = this.el.nativeElement;
    btnWrapper.insertAdjacentHTML('afterbegin', '<span class="ld ld-ring ld-spin"></span>');
  }

  ngOnChanges(changes: SimpleChanges) {
    if (typeof changes.showSpinner === 'object' && !changes.showSpinner.isFirstChange()) {
      if (changes.showSpinner.currentValue === true) {
        this.elementClass = 'mat-loading-button running';
      }

      if (changes.showSpinner.currentValue === false) {
        this.elementClass = 'mat-loading-button';
      }
    }
  }
}
