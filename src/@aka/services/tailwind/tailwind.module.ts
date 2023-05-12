import { NgModule } from '@angular/core';
import { AkaTailwindService } from '@aka/services/tailwind/tailwind.service';

@NgModule({
  providers: [AkaTailwindService],
})
export class AkaTailwindConfigModule {
  /**
   * Constructor
   */
  constructor(private _akaTailwindConfigService: AkaTailwindService) {}
}
