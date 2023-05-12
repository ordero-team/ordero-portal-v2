import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AkaDrawerComponent } from '@aka/components/drawer/drawer.component';

@NgModule({
  declarations: [AkaDrawerComponent],
  imports: [CommonModule],
  exports: [AkaDrawerComponent],
})
export class AkaDrawerModule {}
