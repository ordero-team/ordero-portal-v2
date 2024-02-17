import { Injectable } from '@angular/core';
import { MetalOrigin } from '@lib/metal-data';
import { finalizer, http, ownerTokenizer, parametrize } from '@mtl/middleware';
import { DriverService } from '@mtl/services/driver.service';
import { OriginConfig } from '@mtl/services/origin.service';

@Injectable({
  providedIn: 'root',
})
export class OwnerOriginService extends MetalOrigin<DriverService> {
  public driver: DriverService;

  constructor(driver: DriverService) {
    super(driver, {
      ...OriginConfig,
      get slowNetworkSimulation() {
        return driver.settings.slowNetworkSimulation;
      },
    });

    this.use(ownerTokenizer).use(parametrize).use(http(this.configs)).use(finalizer);

    if (driver.settings.realtimeEvents) {
      this.connect();
    }
  }
}
