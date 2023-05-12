import { NgModule, Optional, SkipSelf } from '@angular/core';
import { AkaMediaWatcherModule } from '@aka/services/media-watcher/media-watcher.module';
import { AkaSplashScreenModule } from '@aka/services/splash-screen/splash-screen.module';
import { AkaTailwindConfigModule } from '@aka/services/tailwind/tailwind.module';
import { AkaUtilsModule } from '@aka/services/utils/utils.module';

@NgModule({
  imports: [AkaMediaWatcherModule, AkaSplashScreenModule, AkaTailwindConfigModule, AkaUtilsModule],
  providers: [],
})
export class AkaModule {
  /**
   * Constructor
   */
  constructor(@Optional() @SkipSelf() parentModule?: AkaModule) {
    if (parentModule) {
      throw new Error('AkaModule has already been loaded. Import this module in the AppModule only!');
    }
  }
}
