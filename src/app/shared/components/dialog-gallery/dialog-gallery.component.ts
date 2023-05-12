import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface IDialogGalleryData {
  index?: number;
  images?: string[];
  labels?: string;
}

@Component({
  selector: 'aka-dialog-gallery',
  templateUrl: './dialog-gallery.component.html',
  styleUrls: ['./dialog-gallery.component.scss'],
})
export class DialogGalleryComponent {
  public current = 0;

  constructor(
    public dialogRef: MatDialogRef<DialogGalleryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IDialogGalleryData
  ) {
    this.current = data.index;
  }

  get images() {
    return this.data.images;
  }

  get image() {
    return this.images[this.current];
  }

  get labels() {
    return this.data.labels;
  }

  get label() {
    return this.labels[this.current];
  }

  public next(): void {
    if (this.current >= this.images.length - 1) {
      this.current = 0;
    } else {
      this.current += 1;
    }
  }

  public prev(): void {
    if (this.current <= 0) {
      this.current = this.images.length - 1;
    } else {
      this.current -= 1;
    }
  }
}
