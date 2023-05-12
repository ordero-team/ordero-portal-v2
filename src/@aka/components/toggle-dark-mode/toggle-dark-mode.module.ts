import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '@mat/material.module';
import { IconModule } from '@visurel/iconify-angular';
import { ToggleDarkModeComponent } from './toggle-dark-mode.component';

@NgModule({
  declarations: [ToggleDarkModeComponent],
  imports: [CommonModule, MaterialModule, IconModule],
  exports: [ToggleDarkModeComponent],
})
export class ToggleDarkModeModule {}
