import { Component, ElementRef, HostBinding, Input } from '@angular/core';
import { SliderItemComponent } from '@sc/slider/slider-item/slider-item.component';

@Component({
  selector: 'aka-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
})
export class SliderComponent {
  @Input() class: string;
  @Input() type: 'bullet' | 'number' | 'none' = 'bullet';
  @Input() navs?: boolean;
  @Input() fit?: boolean;
  @Input() withThumb = false;

  @HostBinding()
  get className(): string {
    return `aka-slider${this.class ? ' ' + this.class : ''}`;
  }

  get styles() {
    if (this.fit && this.elem.nativeElement.parentNode.offsetHeight) {
      return {
        height: `${this.elem.nativeElement.parentNode.offsetHeight}px`,
        overflow: 'hidden',
      };
    }

    if (this.offset.height) {
      return { height: `${this.offset.height}px` };
    }

    return {};
  }

  public current = 0;
  public items: SliderItemComponent[] = [];
  public offset: any = {};

  constructor(private elem: ElementRef) {}

  public next(): void {
    if (this.current >= this.items.length - 1) {
      this.current = 0;
    } else {
      this.current += 1;
    }
  }

  public prev(): void {
    if (this.current <= 0) {
      this.current = this.items.length - 1;
    } else {
      this.current -= 1;
    }
  }
}
