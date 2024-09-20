import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '@cs/auth.service';
import { environment } from '@env/environment';
import * as Sentry from '@sentry/browser';
import { ToastService } from './toast.service';
import { OwnerAuthService } from './owner/auth.service';
import { StaffAuthService } from './staff/auth.service';

@Injectable({ providedIn: 'root' })
export class LoggerService {
  constructor(
    private authService: AuthService,
    private ownerAuthService: OwnerAuthService,
    private staffAuthService: StaffAuthService,
    private toast: ToastService
  ) {
    const { sentryDsn: dsn, envName } = environment;
    if (dsn) {
      Sentry.init({
        dsn,
        environment: envName,
      });
    }
  }

  notify(error: Error) {
    const extractedError = this.extractError(error) || 'Handled unknown error';

    if (this.authService.isAuthenticated()) {
      const { id, email, name: username } = this.authService.currentUser;
      Sentry.setUser({ id, email, username });
    }

    if (this.ownerAuthService.isAuthenticated()) {
      const { id, email, name: username } = this.ownerAuthService.currentUser;
      Sentry.setUser({ id, email, username });
    }

    if (this.staffAuthService.isAuthenticated()) {
      const { id, email, name: username } = this.staffAuthService.currentUser;
      Sentry.setUser({ id, email, username });
    }

    console.error(extractedError);
    // this.toast.error({
    //   title: 'Error!',
    //   detail: extractedError.toString(),
    // });

    Sentry.captureException(extractedError);
  }

  extractError(error) {
    // Try to unwrap zone.js error.
    // https://github.com/angular/angular/blob/master/packages/core/src/util/errors.ts
    if (error && error.ngOriginalError) {
      error = error.ngOriginalError;
    }

    // We can handle messages and Error objects directly.
    if (typeof error === 'string' || error instanceof Error) {
      return error;
    }

    // If it's http module error, extract as much information from it as we can.
    if (error instanceof HttpErrorResponse) {
      // The `error` property of http exception can be either an `Error` object, which we can use directly...
      if (error.error instanceof Error) {
        return error.error;
      }

      // ... or an`ErrorEvent`, which can provide us with the message but no stack...
      if (error.error instanceof ErrorEvent) {
        return error.error.message;
      }

      // ...or the request body itself, which we can use as a message instead.
      if (typeof error.error === 'string') {
        return `Server returned code ${error.status} with body "${error.error}"`;
      }

      // If we don't have any detailed information, fallback to the request message itself.
      return error.message;
    }

    // Skip if there's no error, and let user decide what to do with it.
    return null;
  }
}
