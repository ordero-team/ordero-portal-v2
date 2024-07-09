import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StaffAuthRoute } from './auth.component';

const routes: Routes = [StaffAuthRoute];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
