import { AkaHorizontalNavigationBasicItemComponent } from '@aka/components/navigation/horizontal/components/basic/basic.component';
import { AkaHorizontalNavigationBranchItemComponent } from '@aka/components/navigation/horizontal/components/branch/branch.component';
import { AkaHorizontalNavigationDividerItemComponent } from '@aka/components/navigation/horizontal/components/divider/divider.component';
import { AkaHorizontalNavigationSpacerItemComponent } from '@aka/components/navigation/horizontal/components/spacer/spacer.component';
import { AkaHorizontalNavigationComponent } from '@aka/components/navigation/horizontal/horizontal.component';
import { AkaVerticalNavigationAsideItemComponent } from '@aka/components/navigation/vertical/components/aside/aside.component';
import { AkaVerticalNavigationBasicItemComponent } from '@aka/components/navigation/vertical/components/basic/basic.component';
import { AkaVerticalNavigationCollapsableItemComponent } from '@aka/components/navigation/vertical/components/collapsable/collapsable.component';
import { AkaVerticalNavigationDividerItemComponent } from '@aka/components/navigation/vertical/components/divider/divider.component';
import { AkaVerticalNavigationGroupItemComponent } from '@aka/components/navigation/vertical/components/group/group.component';
import { AkaVerticalNavigationSpacerItemComponent } from '@aka/components/navigation/vertical/components/spacer/spacer.component';
import { AkaVerticalNavigationComponent } from '@aka/components/navigation/vertical/vertical.component';
import { AkaCanModule } from '@aka/directives/can';
import { AkaScrollbarModule } from '@aka/directives/scrollbar/scrollbar.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@mat/material.module';
import { IconModule } from '@visurel/iconify-angular';

@NgModule({
  declarations: [
    AkaHorizontalNavigationBasicItemComponent,
    AkaHorizontalNavigationBranchItemComponent,
    AkaHorizontalNavigationDividerItemComponent,
    AkaHorizontalNavigationSpacerItemComponent,
    AkaHorizontalNavigationComponent,
    AkaVerticalNavigationAsideItemComponent,
    AkaVerticalNavigationBasicItemComponent,
    AkaVerticalNavigationCollapsableItemComponent,
    AkaVerticalNavigationDividerItemComponent,
    AkaVerticalNavigationGroupItemComponent,
    AkaVerticalNavigationSpacerItemComponent,
    AkaVerticalNavigationComponent,
  ],
  imports: [CommonModule, RouterModule, MaterialModule, AkaScrollbarModule, IconModule, AkaCanModule],
  exports: [AkaHorizontalNavigationComponent, AkaVerticalNavigationComponent],
})
export class AkaNavigationModule {}
