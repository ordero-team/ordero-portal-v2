import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@mat/material.module';
import { MetalConfirmComponent } from '@mtl/components/metal-confirm/metal-confirm.component';
import { MetalErrorComponent } from '@mtl/components/metal-error/metal-error.component';
import { MetalQueryExportComponent } from '@mtl/components/metal-query-export/metal-query-export.component';
import { MetalQueryFilterComponent } from '@mtl/components/metal-query-filter/metal-query-filter.component';
import { MetalQueryPaginationComponent } from '@mtl/components/metal-query-pagination/metal-query-pagination.component';
import { MetalQueryRefreshComponent } from '@mtl/components/metal-query-refresh/metal-query-refresh.component';
import { MetalQuerySearchComponent } from '@mtl/components/metal-query-search/metal-query-search.component';
import {
  MetalQueryTableComponent,
  QBodyDirective,
  QCellDirective,
  QColDirective,
  QHeadDirective,
} from '@mtl/components/metal-query-table/metal-query-table.component';
import { MetalQueryComponent } from '@mtl/components/metal-query/metal-query.component';
import { MetalServerCacheDirective } from '@mtl/directives/metal-server-cache.directive';
import { HumanizePipe } from '@mtl/pipes/humanize.pipe';
import { IconModule } from '@visurel/iconify-angular';

@NgModule({
  entryComponents: [],
  declarations: [
    MetalQueryComponent,
    MetalQueryExportComponent,
    MetalQueryTableComponent,
    MetalQueryFilterComponent,
    MetalQuerySearchComponent,
    QHeadDirective,
    QCellDirective,
    QBodyDirective,
    QColDirective,
    MetalConfirmComponent,
    MetalErrorComponent,
    MetalQueryRefreshComponent,
    MetalQueryPaginationComponent,
    MetalServerCacheDirective,
    HumanizePipe,
  ],
  exports: [
    MetalQueryComponent,
    MetalQueryExportComponent,
    MetalQueryTableComponent,
    MetalQueryFilterComponent,
    MetalQuerySearchComponent,
    QHeadDirective,
    QCellDirective,
    QBodyDirective,
    QColDirective,
    MetalConfirmComponent,
    MetalErrorComponent,
    MetalQueryRefreshComponent,
    MetalQueryPaginationComponent,
    MetalServerCacheDirective,
    HumanizePipe,
  ],
  imports: [CommonModule, RouterModule, MaterialModule, FormsModule, IconModule],
})
export class MetalModule {}
