import { Platform } from '@angular/cdk/platform';
import { NgModule } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import {
  DateAdapter,
  ErrorStateMatcher as ParentMatcher,
  MatNativeDateModule,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import {
  MatFormFieldDefaultOptions,
  MatFormFieldModule,
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AppDateAdapter, AppDateFormats } from '@mat/date-format';
import { ErrorStateMatcher } from '@mat/error-state-matcher';

const modules = [
  // MatNativeDateModule,
  MatAutocompleteModule,
  MatButtonModule,
  // MatButtonToggleModule,
  // MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatDialogModule,
  MatExpansionModule,
  MatFormFieldModule,
  // MatGridListModule,
  MatIconModule,
  MatInputModule,
  // MatListModule,
  MatMenuModule,
  // MatPaginatorModule,
  // MatProgressBarModule,
  MatProgressSpinnerModule,
  // MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSlideToggleModule,
  // MatSliderModule,
  MatSnackBarModule,
  // MatSortModule,
  // MatStepperModule,
  // MatTableModule,
  // MatPaginatorModule,
  MatTabsModule,
  // MatToolbarModule,
  MatTooltipModule,
  MatDividerModule,
  // MatRadioModule,
  // MatBadgeModule,
  MatBottomSheetModule,
];

@NgModule({
  declarations: [],
  imports: [...modules],
  exports: [...modules],
  providers: [
    { provide: ParentMatcher, useClass: ErrorStateMatcher },
    {
      provide: DateAdapter,
      useClass: AppDateAdapter,
      deps: [MAT_DATE_LOCALE, Platform],
    },
    {
      provide: MAT_DATE_FORMATS,
      useValue: AppDateFormats,
    },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        appearance: 'fill',
        floatLabel: 'always',
      } as MatFormFieldDefaultOptions,
    },
  ],
})
export class MaterialModule {}
