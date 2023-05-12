import { NgModule } from '@angular/core';
import { AkaMediaWatcherService } from '@aka/services/media-watcher/media-watcher.service';

@NgModule({
  providers: [AkaMediaWatcherService],
})
export class AkaMediaWatcherModule {
  /**
   * Constructor
   */
  constructor(private _akaMediaWatcherService: AkaMediaWatcherService) {}
}
