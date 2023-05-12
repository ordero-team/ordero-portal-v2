import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AkaAlertComponent } from '@aka/components/alert/alert.component';

@NgModule({
  declarations: [AkaAlertComponent],
  imports: [CommonModule, MatButtonModule, MatIconModule],
  exports: [AkaAlertComponent],
})
export class AkaAlertModule {}
