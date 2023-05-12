import { Injectable } from '@angular/core';
import { finalizer, http, parametrize, tokenizer } from '@mtl/middleware';
import { DriverService } from '@mtl/services/driver.service';
import { environment } from '@env/environment';
import { MetalOrigin, MetalOriginConfig } from '@lib/metal-data';

declare let window: any;
const ENV: any = window.ENV || {};

const config: MetalOriginConfig = {
  name: 'main',
  baseURL: ENV.API_URL || environment.apiUrl,
  headers: {
    Accept: 'application/json, text/plain, */*',
    'Content-Type': 'application/json',
  },
  keepTransactions: true,
  defaultLimit: 25,
};

@Injectable({
  providedIn: 'root',
})
export class OriginService extends MetalOrigin<DriverService> {
  public driver: DriverService;

  constructor(driver: DriverService) {
    super(driver, {
      ...config,
      get slowNetworkSimulation() {
        return driver.settings.slowNetworkSimulation;
      },
    });

    this.use(tokenizer).use(parametrize).use(http(this.configs)).use(finalizer);

    if (driver.settings.realtimeEvents) {
      this.connect();
    }
  }
}
