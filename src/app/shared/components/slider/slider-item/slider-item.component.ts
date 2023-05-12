import { Component, ElementRef, Host, HostBinding, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogGalleryComponent } from '@sc/dialog-gallery/dialog-gallery.component';
import { SliderComponent } from '@sc/slider/slider.component';

@Component({
  selector: 'aka-slider-item',
  templateUrl: './slider-item.component.html',
  styleUrls: ['./slider-item.component.scss'],
})
export class SliderItemComponent implements OnInit, OnDestroy {
  @Input() class: string;
  @Input() thumb?: string;
  @Input() img?: string;
  @Input() label?: string;

  @HostBinding()
  get className(): string {
    const names = ['aka-slider-item'];

    if (this.class) {
      names.push(this.class);
    }

    if (this.slider && this.slider.current === this.index) {
      names.push('active');
    }

    if (this.img) {
      names.push('aka-slider-image');
    }

    return names.join(' ');
  }

  get index() {
    return this.slider.items.indexOf(this) || 0;
  }

  constructor(@Host() public slider: SliderComponent, private elem: ElementRef, private dialog: MatDialog) {}

  public ngOnInit(): void {
    this.slider.items.push(this);
    setTimeout(() => this.applySizing(), 50);
  }

  public ngOnDestroy(): void {
    this.slider.items.splice(this.slider.items.indexOf(this), 1);
  }

  private applySizing(): void {
    const { height } = this.slider.offset;
    const { offsetHeight } = this.elem.nativeElement;

    if (!height || (height && offsetHeight > height)) {
      this.slider.offset.height = this.elem.nativeElement.offsetHeight;
    }
  }

  zoomIn(): void {
    const dialogRef = this.dialog.open(DialogGalleryComponent, {
      data: {
        index: this.index,
        images: this.slider.items.map((item) => item.img),
        labels: this.slider.items.map((item) => item.label),
      },
    });

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    dialogRef.afterClosed().subscribe(() => {});
  }
}
