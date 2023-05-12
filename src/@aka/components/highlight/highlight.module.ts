import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AkaHighlightComponent } from '@aka/components/highlight/highlight.component';

@NgModule({
  declarations: [AkaHighlightComponent],
  imports: [CommonModule],
  exports: [AkaHighlightComponent],
  entryComponents: [AkaHighlightComponent],
})
export class AkaHighlightModule {}
