import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';
import { Persistent } from '@lib/metal-data';
import { MetalSettings } from '@mtl/interfaces';

@Directive({
  selector: '[psMetalServerCache]',
})
export class MetalServerCacheDirective {
  @Persistent('metal-settings')
  settings: MetalSettings;

  constructor(private templateRef: TemplateRef<any>, private containerRef: ViewContainerRef) {
    if (this.settings.serverCache) {
      this.containerRef.createEmbeddedView(this.templateRef);
    } else {
      this.containerRef.clear();
    }
  }
}
