import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { ErrorNotfoundComponent } from '@pg/error/notfound/notfound.component';
import { ErrorUnauthorizedComponent } from '@pg/error/unauthorized/unauthorized.component';

import { ErrorRoutingModule } from './error-routing.module';
import { ErrorComponent } from './error.component';

@NgModule({
  declarations: [ErrorComponent, ErrorNotfoundComponent, ErrorUnauthorizedComponent],
  imports: [SharedModule, ErrorRoutingModule],
})
export class ErrorModule {}
