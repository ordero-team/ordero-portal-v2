import { Component, Directive, HostBinding, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IDialogData } from '../dialog/dialog.component';

@Directive({
  selector: '[akaDialogContent]',
})
export class DialogContentDirective {}

@Directive({
  selector: '[akaDialogAction]',
})
export class DialogActionDirective {}

@Directive({
  selector: '[akaDialogFoot]',
})
export class DialogFootDirective {}

@Component({
  selector: 'aka-dialog-content',
  templateUrl: './dialog-content.component.html',
  styleUrls: ['./dialog-content.component.scss'],
})
export class DialogContentComponent {
  @HostBinding('class')
  get class() {
    return this.data.class;
  }

  constructor(public dialog: MatDialogRef<DialogContentComponent>, @Inject(MAT_DIALOG_DATA) public data: IDialogData) {}
}
