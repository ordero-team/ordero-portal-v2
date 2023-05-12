import { Component, Inject } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface MetalConfirmData {
  title?: string;
  message?: string;
  confirmLabel?: string;
  confirmColor?: ThemePalette;
  showWarning?: boolean;
}

@Component({
  selector: 'ps-metal-confirm',
  templateUrl: './metal-confirm.component.html',
  styleUrls: ['./metal-confirm.component.scss'],
})
export class MetalConfirmComponent {
  constructor(public dgRef: MatDialogRef<MetalConfirmData>, @Inject(MAT_DIALOG_DATA) public data: MetalConfirmData) {}

  public confirm() {
    this.dgRef.close(this.data);
  }

  public cancel() {
    this.dgRef.close();
  }
}
