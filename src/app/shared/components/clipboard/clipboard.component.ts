import { Component, Input, ViewEncapsulation } from '@angular/core';
import { ClipboardService } from '@cs/clipboard.service';

@Component({
  selector: 'aka-clipboard',
  templateUrl: './clipboard.component.html',
  styleUrls: ['./clipboard.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ClipboardComponent {
  @Input() value: any;
  @Input() tooltip?: string;
  @Input() icon?: string;

  constructor(public clipboard: ClipboardService) {}
}
