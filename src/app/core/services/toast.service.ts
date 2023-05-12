import { ErrorHandler, Injectable } from '@angular/core';
import { appIcons } from '@ch/icon.helper';
import { get, has } from 'lodash';
import { Icon } from '@visurel/iconify-angular';

export interface IToastMessage {
  title: string;
  detail?: string;
  icon?: string | Icon;
  classes?: string;
  timeout?: number;
  error?: any;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  public messages: IToastMessage[] = [];
  public limit = 5;
  private _showLimit = true;

  get showLimit() {
    return this._showLimit && this.messages.length > this.limit;
  }

  set showLimit(showLimit: boolean) {
    this._showLimit = showLimit;
  }

  get limitedMessages() {
    return this.showLimit ? this.messages.slice(0, this.limit) : this.messages;
  }

  constructor(private handler: ErrorHandler) {}

  info(opts: IToastMessage | string): void {
    const toast: IToastMessage = {
      title: 'Attention!',
      icon: appIcons.informationCircle,
      classes: '',
    };
    if (typeof opts === 'string') {
      Object.assign(toast, { detail: opts });
    } else {
      Object.assign(toast, opts);
    }

    // set class
    Object.assign(toast, { classes: `toast-info ${toast.classes || ''}` });

    this.insert(toast);
  }

  error(opts: IToastMessage | string, error?: any): void {
    const toast: IToastMessage = {
      title: 'Error!',
      icon: appIcons.exclamationCircle,
      classes: '',
      error: error || {},
      timeout: 0,
    };
    if (typeof opts === 'string') {
      Object.assign(toast, { detail: opts });
    } else {
      Object.assign(toast, opts);
    }

    // set class
    Object.assign(toast, { classes: `toast-error ${toast.classes || ''}` });

    if (error) {
      this.handler.handleError(error);

      if (has(error, 'request.data')) {
        const { message, errors = null } = error.request.data;

        Object.assign(toast, { detail: message || get(error, 'request.statusText', 'Something bad happened!') });

        if (errors) {
          const validation = `<ul>${errors.map(({ error: code }) => `<li>${code}</li>`).join('')}</ul>`;
          Object.assign(toast, { title: 'Validation Error!', detail: validation });
        }
      } else if (has(error, 'error.message')) {
        Object.assign(toast, { detail: error.error.message });
      } else if (has(error, 'message')) {
        Object.assign(toast, { detail: error.message });
      }
    }

    this.insert(toast);
  }

  warning(opts: IToastMessage | string): void {
    const toast: IToastMessage = {
      title: 'Warning!',
      icon: appIcons.exclamationIcon,
      classes: '',
    };
    if (typeof opts === 'string') {
      Object.assign(toast, { detail: opts });
    } else {
      Object.assign(toast, opts);
    }

    // set class
    Object.assign(toast, { classes: `toast-warning ${toast.classes || ''}` });

    this.insert(toast);
  }

  insert(message: IToastMessage): void {
    this.messages.push(message);

    if (message.timeout !== 0) {
      setTimeout(() => this.remove(message), message.timeout || 5000);
    }
  }

  remove(message?: IToastMessage): void {
    if (!message) {
      this.messages = [];
    } else {
      this.messages.splice(this.messages.indexOf(message), 1);
    }

    // reset limitation on empty messages
    if (!this.messages.length) {
      this.showLimit = true;
    }
  }
}
