import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'aka-form-message',
  template: '<mat-error @animation *ngIf="message" class="error">{{message}}</mat-error>',
  animations: [
    trigger('animation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-1rem)' }),
        animate('200ms ease-in', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
      transition(':leave', [animate('200ms ease-out', style({ opacity: 0, transform: 'translateY(-1rem)' }))]),
    ]),
  ],
})
export class FormMessageComponent {
  public message: string;
}
