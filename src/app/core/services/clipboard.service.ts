import { Injectable } from '@angular/core';
import { ToastService } from '@cs/toast.service';
import * as _ from 'lodash';

declare let window: {
  ClipboardSource: HTMLTextAreaElement;
};

@Injectable({ providedIn: 'root' })
export class ClipboardService {
  success: any;
  failed: any;

  constructor(private toast: ToastService) {}

  copy(value: any) {
    if (_.isObject(value) || _.isArray(value)) {
      value = JSON.stringify(value, null, 2);
    }

    if (!window.ClipboardSource) {
      window.ClipboardSource = document.createElement('textarea');
      window.ClipboardSource.classList.add('clipboard-source-wrapper');

      document.body.appendChild(window.ClipboardSource);
    }

    const { ClipboardSource } = window;
    try {
      ClipboardSource.value = value;
      ClipboardSource.select();

      document.execCommand('copy');
      this.toast.info({
        title: 'Clipboard Success',
        detail: 'Text copied to clipboard.',
      });
    } catch (error) {
      this.toast.error(
        {
          title: 'Clipboard Failed',
          detail: 'Something went wrong when copying text to clipboard.',
        },
        error
      );
    }
  }
}
