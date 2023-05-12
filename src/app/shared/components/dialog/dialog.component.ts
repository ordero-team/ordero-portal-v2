import { Component, ContentChild, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { has } from 'lodash';
import {
  DialogActionDirective,
  DialogContentComponent,
  DialogContentDirective,
  DialogFootDirective,
} from '../dialog-content/dialog-content.component';

export interface IDialogData {
  title?: string;
  contentRef?: DialogContentDirective;
  actionRef?: DialogActionDirective;
  footRef?: DialogFootDirective;
  class?: string;
  static?: boolean;
  data?: any;
}

@Component({
  selector: 'aka-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  exportAs: 'akaDialog',
})
export class DialogComponent {
  private dialogRef: MatDialogRef<DialogContentComponent>;
  _data: any = null;
  opened = false;

  @Input() title: string;
  @Input() class?: string;
  @Input() options?: any = {};
  @Input() static?: boolean;

  @Output() open = new EventEmitter<any>();
  @Output() close = new EventEmitter<any>();

  @ContentChild(DialogContentDirective, { read: TemplateRef, static: true }) contentRef: DialogContentDirective;
  @ContentChild(DialogActionDirective, { read: TemplateRef, static: true }) actionRef: DialogActionDirective;
  @ContentChild(DialogFootDirective, { read: TemplateRef, static: true }) footRef: DialogFootDirective;

  constructor(private dialog: MatDialog) {}

  show(optional: IDialogData = {}) {
    const data: IDialogData = {
      title: this.title,
      contentRef: this.contentRef,
      actionRef: this.actionRef,
      footRef: this.footRef,
      class: this.class,
      static: this.static,
      ...optional,
    };

    if (has(data, 'data')) {
      this._data = data.data;
    }

    const dialog = (this.dialogRef = this.dialog.open(DialogContentComponent, {
      data,
      disableClose: this.static,
      autoFocus: false,
      ...this.options,
    }));

    dialog.afterOpened().subscribe((result) => {
      this.open.emit({ result, dialog });
      this.opened = true;
    });
    dialog.afterClosed().subscribe((result) => {
      this.close.emit({ result, dialog });
      this.opened = false;
    });
  }

  hide(result?: any) {
    if (this.dialogRef) {
      this.dialogRef.close(result);
    }
    this.opened = false;
  }
}
