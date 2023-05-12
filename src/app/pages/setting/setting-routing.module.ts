import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingRoute } from './setting.component';

const routes: Routes = [SettingRoute];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingRoutingModule {}
