import { AkaModule } from '@aka/aka.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from '@app/core/core.module';
import { LayoutsModule } from '@app/layouts/layouts.module';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { OrderoRoutingModule } from './ordero-routing.module';
import { OrderoComponent } from './ordero.component';

@NgModule({
  declarations: [OrderoComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LoadingBarRouterModule,
    LoadingBarModule,
    OrderoRoutingModule,
    CoreModule,
    AkaModule,
    LayoutsModule,
  ],
  providers: [],
  bootstrap: [OrderoComponent],
})
export class OrderoModule {}
