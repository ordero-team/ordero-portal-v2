import { ModuleWithProviders, NgModule } from '@angular/core';
import { AkaConfigService } from '@aka/services/config/config.service';
import { AKA_APP_CONFIG } from '@aka/services/config/config.constants';

@NgModule()
export class AkaConfigModule {
  /**
   * Constructor
   */
  constructor(private _akaConfigService: AkaConfigService) {}

  /**
   * forRoot method for setting user configuration
   *
   * @param config
   */
  static forRoot(config: any): ModuleWithProviders<AkaConfigModule> {
    return {
      ngModule: AkaConfigModule,
      providers: [
        {
          provide: AKA_APP_CONFIG,
          useValue: config,
        },
      ],
    };
  }
}
