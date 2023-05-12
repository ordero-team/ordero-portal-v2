import { Injectable } from '@angular/core';
import { AkaDrawerComponent } from '@aka/components/drawer/drawer.component';

@Injectable({
  providedIn: 'root',
})
export class AkaDrawerService {
  private _componentRegistry: Map<string, AkaDrawerComponent> = new Map<string, AkaDrawerComponent>();

  /**
   * Constructor
   */
  constructor() {}

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Register drawer component
   *
   * @param name
   * @param component
   */
  registerComponent(name: string, component: AkaDrawerComponent): void {
    this._componentRegistry.set(name, component);
  }

  /**
   * Deregister drawer component
   *
   * @param name
   */
  deregisterComponent(name: string): void {
    this._componentRegistry.delete(name);
  }

  /**
   * Get drawer component from the registry
   *
   * @param name
   */
  getComponent(name: string): AkaDrawerComponent | undefined {
    return this._componentRegistry.get(name);
  }
}
