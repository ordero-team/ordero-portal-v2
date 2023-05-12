import { UserMenuComponent } from '@aka/components/user-menu/user-menu.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@mat/material.module';
import { IconModule } from '@visurel/iconify-angular';

@NgModule({
  declarations: [UserMenuComponent],
  imports: [CommonModule, MaterialModule, IconModule, RouterModule],
  exports: [UserMenuComponent],
})
export class UserMenuModule {}
