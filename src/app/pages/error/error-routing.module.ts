import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorRoute } from '@pg/error/error.component';

const routes: Routes = [ErrorRoute];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ErrorRoutingModule {}
