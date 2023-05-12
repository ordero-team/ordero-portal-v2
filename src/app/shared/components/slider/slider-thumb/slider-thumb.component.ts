import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SliderItemComponent } from '@sc/slider/slider-item/slider-item.component';

@Component({
  selector: 'aka-slider-thumb',
  templateUrl: './slider-thumb.component.html',
  styleUrls: ['./slider-thumb.component.scss'],
})
export class SliderThumbComponent {
  @Input() items: SliderItemComponent[];
  @Input() current: number;

  @Output() change = new EventEmitter<any>();

  constructor() {}

  setActive(index: number) {
    this.current = index;
    this.change.emit(index);
  }
}
