import { Component, Input } from '@angular/core';
import { MetalTransactionError } from '@lib/metal-data';

@Component({
  selector: 'ps-metal-error',
  templateUrl: './metal-error.component.html',
  styleUrls: ['./metal-error.component.scss'],
})
export class MetalErrorComponent {
  @Input() error: MetalTransactionError<any>;

  public get darkMode() {
    return document.body.className.includes('body-dark-mode');
  }
}
