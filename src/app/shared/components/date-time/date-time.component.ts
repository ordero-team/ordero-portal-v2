import { Component, Input } from '@angular/core';

@Component({
  selector: 'aka-date-time',
  templateUrl: './date-time.component.html',
  styleUrls: ['./date-time.component.css'],
})
export class DateTimeComponent {
  @Input() date: string | Date;
  @Input() format = 'DD/MM/YYYY, HH:mm';
  @Input() pretty = true;
  @Input() isUtc = false;
}
