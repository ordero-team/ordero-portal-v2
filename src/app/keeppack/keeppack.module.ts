import { AkaModule } from '@aka/aka.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from '@app/core/core.module';
import { LayoutsModule } from '@app/layouts/layouts.module';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { KeeppackRoutingModule } from './keeppack-routing.module';
import { KeeppackComponent } from './keeppack.component';

@NgModule({
  declarations: [KeeppackComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LoadingBarRouterModule,
    LoadingBarModule,
    KeeppackRoutingModule,
    CoreModule,
    AkaModule,
    LayoutsModule,
  ],
  providers: [],
  bootstrap: [KeeppackComponent],
})
export class KeeppackModule {}
