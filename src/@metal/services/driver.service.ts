import { Injectable } from '@angular/core';
import { MetalDriver, Persistent } from '@lib/metal-data';
import { MetalSettings } from '@mtl/interfaces';

@Injectable({
  providedIn: 'root',
})
export class DriverService extends MetalDriver {
  @Persistent<MetalSettings>('metal-settings', {
    enabled: true,
    memoryCache: true,
    persistentCache: true,
    serverCache: true,

    realtimeEvents: false,
    slowNetworkSimulation: false,
  })
  public settings: MetalSettings;

  constructor() {
    super({ global: true });

    const { settings } = this;
    this.configs = {
      get memoryCache() {
        return settings.memoryCache;
      },
      get persistentCache() {
        return settings.persistentCache;
      },
      syncDelay: 3000,
    };
  }
}
