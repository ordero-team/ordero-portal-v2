import { NgModule } from '@angular/core';
import { AkaUtilsService } from '@aka/services/utils/utils.service';

@NgModule({
  providers: [AkaUtilsService],
})
export class AkaUtilsModule {
  /**
   * Constructor
   */
  constructor(private _akaUtilsService: AkaUtilsService) {}
}
