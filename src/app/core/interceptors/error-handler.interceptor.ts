import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@cs/auth.service';
import { LoggerService } from '@cs/logger.service';
import { environment } from '@env/environment';
import { get } from 'lodash';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  // Error handling is important and needs to be loaded first.
  // Because of this we should manually inject the services with Injector.
  constructor(private injector: Injector, private router: Router) {}

  handleError(error: any): void {
    // if returning token error then logout
    const res = get(error, 'response.data', { status_code: '000', code: null });
    if (res.code === 'invalid_token') {
      // check if customer state available
      const auth = this.injector.get(AuthService);
      auth.clearState(true);
    } else if (res.code === 'forbidden_resource') {
      this.router.navigate(['/error/unauthorized']);
    }

    if (environment.production) {
      const logger = this.injector.get(LoggerService);
      // Always log errors
      logger.notify(error);
    } else {
      console.error(error);
    }
  }
}
