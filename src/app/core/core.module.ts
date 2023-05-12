import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule, Optional, SkipSelf } from '@angular/core';
import { GlobalErrorHandler } from '@app/core/interceptors/error-handler.interceptor';
import { QueueComponent } from '@cc/queue/queue.component';
import { ToastComponent } from '@cc/toast/toast.component';
import { httpLoaderFactory } from '@ch/aot.helper';
import { LANGUAGES } from '@ch/language.helper';
import { AkaStorageEngine } from '@ch/storage.helper';
import { states } from '@ct/entry.state';
import { environment } from '@env/environment';
import { MaterialModule } from '@mat/material.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { NgxsStoragePluginModule, STORAGE_ENGINE } from '@ngxs/storage-plugin';
import { NgxsModule } from '@ngxs/store';
import { IconModule } from '@visurel/iconify-angular';
import { NgxCurrencyModule } from 'ngx-currency';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { CanDirective } from './directives/can.directive';
import { PubsubService } from './services/pubsub.service';

const declarations = [ToastComponent, QueueComponent, CanDirective];

@NgModule({
  declarations: [...declarations],
  imports: [
    CommonModule,
    HttpClientModule,
    MaterialModule,
    IconModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    NgxCurrencyModule.forRoot({
      prefix: 'Rp',
      thousands: ',',
      decimal: '.',
      nullable: false,
      suffix: '',
      align: 'left',
      allowNegative: false,
      allowZero: true,
      precision: null,
    }),
    // ngxs
    NgxsModule.forRoot(states, {
      developmentMode: !environment.production,
    }),
    NgxsStoragePluginModule.forRoot({
      key: ['auth', 'role'],
    }),
    NgxsReduxDevtoolsPluginModule.forRoot({
      name: 'Keeppack App',
      disabled: environment.production,
    }),
    NgxsRouterPluginModule.forRoot(),
    NgxJsonViewerModule,
  ],
  exports: [...declarations],
  providers: [
    {
      provide: STORAGE_ENGINE,
      useClass: AkaStorageEngine,
    },
    {
      provide: LANGUAGES,
      useValue: ['en', 'fr'],
    },
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler,
    },
    PubsubService,
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import only in AppModule');
    }
  }
}
