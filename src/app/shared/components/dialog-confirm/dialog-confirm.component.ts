import { Component, HostBinding, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface IDialogConfirmData {
  title?: string;
  message?: string;
  showConfirm?: boolean;
  confirmLabel?: string;
  confirmColor?: string;
  showWarning?: boolean;
  warningMessage?: string;
  record?: any;
  class?: string;
}

@Component({
  selector: 'aka-dialog-confirm',
  templateUrl: './dialog-confirm.component.html',
  styleUrls: ['./dialog-confirm.component.scss'],
})
export class DialogConfirmComponent {
  @HostBinding('class') className = '';

  constructor(
    public dialogRef: MatDialogRef<DialogConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IDialogConfirmData
  ) {
    this.className = this.data.class;
  }

  cancel() {
    this.dialogRef.close();
  }

  confirm() {
    if (this.dialogRef) {
      this.dialogRef.close(this.data);
    }
  }
}
