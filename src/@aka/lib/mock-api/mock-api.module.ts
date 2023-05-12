import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AKA_MOCK_API_DEFAULT_DELAY } from '@aka/lib/mock-api/mock-api.constants';
import { AkaMockApiInterceptor } from '@aka/lib/mock-api/mock-api.interceptor';

@NgModule({
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AkaMockApiInterceptor,
      multi: true,
    },
  ],
})
export class AkaMockApiModule {
  /**
   * AkaMockApi module default configuration.
   *
   * @param mockApiServices - Array of services that register mock API handlers
   * @param config - Configuration options
   * @param config.delay - Default delay value in milliseconds to apply all responses
   */
  static forRoot(mockApiServices: any[], config?: { delay?: number }): ModuleWithProviders<AkaMockApiModule> {
    return {
      ngModule: AkaMockApiModule,
      providers: [
        {
          provide: APP_INITIALIZER,
          deps: [...mockApiServices],
          useFactory: () => () => null,
          multi: true,
        },
        {
          provide: AKA_MOCK_API_DEFAULT_DELAY,
          useValue: config?.delay ?? 0,
        },
      ],
    };
  }
}
