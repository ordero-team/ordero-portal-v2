import { AgmCoreModule } from '@agm/core';
import { AkaNavigationModule } from '@aka/components/navigation/navigation.module';
import { ToggleDarkModeModule } from '@aka/components/toggle-dark-mode/toggle-dark-mode.module';
import { ObserversModule } from '@angular/cdk/observers';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@mat/material.module';
import { MetalModule } from '@mtl/metal.module';
import { TranslateModule } from '@ngx-translate/core';
import { ApiAutocompleteComponent, DropOptionDirective } from '@sc/api-autocomplete/api-autocomplete.component';
import { BackdropLoaderComponent } from '@sc/backdrop-loader/backdrop-loader.component';
import { BreadcrumbActionComponent } from '@sc/breadcrumbs/action/action.component';
import { BreadcrumbsComponent } from '@sc/breadcrumbs/breadcrumbs.component';
import { BreadcrumbGroupComponent, BreadcrumbGroupDirective } from '@sc/breadcrumbs/group/group.component';
import { BreadcrumbItemComponent } from '@sc/breadcrumbs/item/item.component';
import {
  CardComponent,
  CardContentComponent,
  CardFootComponent,
  CardHeadComponent,
  CardInnerComponent,
  CardTitleComponent,
} from '@sc/card/card.component';
import { ClipboardComponent } from '@sc/clipboard/clipboard.component';
import { DateTimeComponent } from '@sc/date-time/date-time.component';
import { DialogConfirmComponent } from '@sc/dialog-confirm/dialog-confirm.component';
import {
  DialogActionDirective,
  DialogContentComponent,
  DialogContentDirective,
  DialogFootDirective,
} from '@sc/dialog-content/dialog-content.component';
import { DialogGalleryComponent } from '@sc/dialog-gallery/dialog-gallery.component';
import { DialogComponent } from '@sc/dialog/dialog.component';
import { EmptyPageComponent } from '@sc/empty-page/empty-page.component';
import { FormMessageComponent } from '@sc/form-message/form-message.component';
import { FormRequiredMarkerComponent } from '@sc/form-required-marker/form-required-marker.component';
import { ImageUploadComponent } from '@sc/image-upload/image-upload.component';
import { RouteActivatorComponent } from '@sc/route-activator/route-activator.component';
import { SliderItemComponent } from '@sc/slider/slider-item/slider-item.component';
import { SliderThumbComponent } from '@sc/slider/slider-thumb/slider-thumb.component';
import { SliderComponent } from '@sc/slider/slider.component';
import { StateLabelComponent } from '@sc/state-label/state-label.component';
import { SubNavigationComponent } from '@sc/sub-navigation/sub-navigation.component';
import {
  TableCellDirective,
  TableCellRefDirective,
  TableColDirective,
  TableComponent,
  TableExpandColDirective,
  TableHeadCellDirective,
  TableHeadCellRefDirective,
} from '@sc/table/table.component';
import { UnderDevelopmentComponent } from '@sc/under-development/under-development.component';
import { AutofocusDirective } from '@sd/autofocus.directive';
import { CanDirective } from '@sd/can.directive';
import { FormDirective } from '@sd/form.directive';
import { LazyloadDirective } from '@sd/lazyload.directive';
import { LoadingDirective } from '@sd/loading.directive';
import { NoNegativeDirective } from '@sd/no-negative.directive';
import { PropsDirective } from '@sd/props.directive';
import { SortDirective } from '@sd/sort.directive';
import { AcronymPipe } from '@sp/acronym.pipe';
import { CapitalizePipe } from '@sp/capitalize.pipe';
import { CurrencyPipe } from '@sp/currency.pipe';
import { LimitPipe } from '@sp/limit.pipe';
import { OrderByPipe } from '@sp/orderby.pipe';
import { PhoneNumberPipe } from '@sp/phone-number.pipe';
import { SafePipe } from '@sp/safe.pipe';
import { StateLabelPipe } from '@sp/state-label.pipe';
import { TimestampPipe } from '@sp/timestamp.pipe';
import { ToNumberPipe } from '@sp/to-number.pipe';
import { UnescapePipe } from '@sp/unescape.pipe';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { IconModule } from '@visurel/iconify-angular';
import { CurrencyMaskModule, CURRENCY_MASK_CONFIG } from 'ng2-currency-mask';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { NgxScannerQrcodeModule } from 'ngx-scanner-qrcode';
import { HeaderComponent } from './components/customer/header/header.component';
import { CustomerRestaurantListComponent } from './components/customer/restaurant/list/list.component';
import { ScanQrComponent } from './components/customer/scan-qr/scan-qr.component';
import { CategoryFormComponent } from './components/form/category-form/category-form.component';
import { GroupFormComponent } from './components/form/group-form/group-form.component';
import { LocationFormComponent } from './components/form/location-form/location-form.component';
import { ProductFormComponent } from './components/form/product-form/product-form.component';
import { StaffFormComponent } from './components/form/staff-form/staff-form.component';
import { StockFormComponent } from './components/form/stock-form/stock-form.component';
import { TableFormComponent } from './components/form/table-form/table-form.component';
import { VariantFormComponent } from './components/form/variant-form/variant-form.component';
import { MapComponent } from './components/map/map.component';
import { OrderDetailItemsComponent } from './components/order-detail-items/order-detail-items.component';
import { OwnerUserMenuComponent } from './components/owner/user-menu/user-menu.component';
import { SelectCategoriesComponent } from './components/select-categories/select-categories.component';
import { SelectLocationComponent } from './components/select-location/select-location.component';
import { SelectLocationsComponent } from './components/select-locations/select-locations.component';
import { SelectMultipleAutocompleteComponent } from './components/select-multiple-autocomplete/select-multiple-autocomplete.component';
import { SelectProductComponent } from './components/select-product/select-product.component';
import { SelectRoleComponent } from './components/select-role/select-role.component';
import { SelectVariantGroupComponent } from './components/select-variant-group/select-variant-group.component';
import { SelectVariantsComponent } from './components/select-variants/select-variants.component';

const modules = [
  CommonModule,
  RouterModule,
  ObserversModule,
  FormsModule,
  ReactiveFormsModule,
  TranslateModule,
  IconModule,
  MaterialModule,
  MetalModule,
  AkaNavigationModule,
  CurrencyMaskModule,
  NgxJsonViewerModule,
  NgxChartsModule,
  NgxDropzoneModule,
  ToggleDarkModeModule,
  MatToolbarModule,
  NgxScannerQrcodeModule,
];

const declarations = [
  // Directives
  FormDirective,
  PropsDirective,
  LoadingDirective,
  TableHeadCellRefDirective,
  TableHeadCellDirective,
  TableCellRefDirective,
  TableCellDirective,
  TableColDirective,
  TableExpandColDirective,
  DialogActionDirective,
  DialogContentDirective,
  DialogFootDirective,
  BreadcrumbGroupDirective,
  LazyloadDirective,
  SortDirective,
  DropOptionDirective,
  AutofocusDirective,
  NoNegativeDirective,
  CanDirective,

  // Pipe
  AcronymPipe,
  TimestampPipe,
  LimitPipe,
  CapitalizePipe,
  CurrencyPipe,
  SafePipe,
  UnescapePipe,
  OrderByPipe,
  ToNumberPipe,
  StateLabelPipe,
  PhoneNumberPipe,

  // Components
  FormMessageComponent,
  FormRequiredMarkerComponent,
  BreadcrumbsComponent,
  BreadcrumbItemComponent,
  BreadcrumbActionComponent,
  BreadcrumbGroupComponent,
  RouteActivatorComponent,
  UnderDevelopmentComponent,
  SubNavigationComponent,
  DateTimeComponent,
  StateLabelComponent,
  CardComponent,
  CardHeadComponent,
  CardTitleComponent,
  CardInnerComponent,
  CardContentComponent,
  CardFootComponent,
  ClipboardComponent,
  TableComponent,
  EmptyPageComponent,
  DialogComponent,
  DialogContentComponent,
  ApiAutocompleteComponent,
  BackdropLoaderComponent,
  ImageUploadComponent,
  SelectMultipleAutocompleteComponent,

  // Dialog Slider Image
  DialogGalleryComponent,
  SliderComponent,
  SliderItemComponent,
  SliderThumbComponent,
  DialogConfirmComponent,

  MapComponent,

  // Owner
  OwnerUserMenuComponent,
  OrderDetailItemsComponent,

  // Form
  LocationFormComponent,
  TableFormComponent,
  StaffFormComponent,
  CategoryFormComponent,
  GroupFormComponent,
  VariantFormComponent,
  ProductFormComponent,
  StockFormComponent,

  // Select
  SelectLocationComponent,
  SelectLocationsComponent,
  SelectRoleComponent,
  SelectVariantGroupComponent,
  SelectCategoriesComponent,
  SelectVariantsComponent,
  SelectProductComponent,

  // Customer
  HeaderComponent,
  ScanQrComponent,
  CustomerRestaurantListComponent,
];

@NgModule({
  entryComponents: [DialogContentComponent],
  declarations: [...declarations],
  imports: [
    ...modules,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBhiEE3vMaVz6LO4ArPkiYfAxR5rA1qAw0',
      libraries: ['places'],
    }),
  ],
  exports: [...modules, ...declarations],
  providers: [
    {
      provide: CURRENCY_MASK_CONFIG,
      useValue: {
        prefix: 'Rp',
        thousands: ',',
        decimal: '.',
        nullable: false,
        suffix: '',
        align: 'left',
        allowNegative: false,
        allowZero: true,
        precision: null,
      },
    },
  ],
})
export class SharedModule {}
