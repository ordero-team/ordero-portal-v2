import { Component, Input } from '@angular/core';

@Component({
  selector: 'aka-backdrop-loader',
  templateUrl: './backdrop-loader.component.html',
  styleUrls: ['./backdrop-loader.component.scss'],
})
export class BackdropLoaderComponent {
  @Input() diameter = 48;
  @Input() noBackdrop = false;
  @Input() class?: string;
}
