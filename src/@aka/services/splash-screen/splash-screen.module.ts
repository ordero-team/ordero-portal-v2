import { NgModule } from '@angular/core';
import { AkaSplashScreenService } from '@aka/services/splash-screen/splash-screen.service';

@NgModule({
  providers: [AkaSplashScreenService],
})
export class AkaSplashScreenModule {
  /**
   * Constructor
   */
  constructor(private _akaSplashScreenService: AkaSplashScreenService) {}
}
