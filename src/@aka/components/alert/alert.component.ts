import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { AkaAnimations } from '@aka/animations';
import { AkaAlertAppearance, AkaAlertType } from '@aka/components/alert/alert.types';
import { AkaAlertService } from '@aka/components/alert/alert.service';
import { AkaUtilsService } from '@aka/services/utils/utils.service';

@Component({
  selector: 'aka-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: AkaAnimations,
  exportAs: 'akaAlert',
})
export class AkaAlertComponent implements OnChanges, OnInit, OnDestroy {
  static ngAcceptInputType_dismissible: BooleanInput;
  static ngAcceptInputType_dismissed: BooleanInput;
  static ngAcceptInputType_showIcon: BooleanInput;

  @Input() appearance: AkaAlertAppearance = 'soft';
  @Input() dismissed = false;
  @Input() dismissible = false;
  @Input() name: string = this._akaUtilsService.randomId();
  @Input() showIcon = true;
  @Input() type: AkaAlertType = 'primary';
  @Output() readonly dismissedChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  /**
   * Constructor
   */
  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _akaAlertService: AkaAlertService,
    private _akaUtilsService: AkaUtilsService
  ) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  /**
   * Host binding for component classes
   */
  @HostBinding('class') get classList(): any {
    return {
      'aka-alert-appearance-border': this.appearance === 'border',
      'aka-alert-appearance-fill': this.appearance === 'fill',
      'aka-alert-appearance-outline': this.appearance === 'outline',
      'aka-alert-appearance-soft': this.appearance === 'soft',
      'aka-alert-dismissed': this.dismissed,
      'aka-alert-dismissible': this.dismissible,
      'aka-alert-show-icon': this.showIcon,
      'aka-alert-type-primary': this.type === 'primary',
      'aka-alert-type-accent': this.type === 'accent',
      'aka-alert-type-warn': this.type === 'warn',
      'aka-alert-type-basic': this.type === 'basic',
      'aka-alert-type-info': this.type === 'info',
      'aka-alert-type-success': this.type === 'success',
      'aka-alert-type-warning': this.type === 'warning',
      'aka-alert-type-error': this.type === 'error',
    };
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On changes
   *
   * @param changes
   */
  ngOnChanges(changes: SimpleChanges): void {
    // Dismissed
    if ('dismissed' in changes) {
      // Coerce the value to a boolean
      this.dismissed = coerceBooleanProperty(changes.dismissed.currentValue);

      // Dismiss/show the alert
      this._toggleDismiss(this.dismissed);
    }

    // Dismissible
    if ('dismissible' in changes) {
      // Coerce the value to a boolean
      this.dismissible = coerceBooleanProperty(changes.dismissible.currentValue);
    }

    // Show icon
    if ('showIcon' in changes) {
      // Coerce the value to a boolean
      this.showIcon = coerceBooleanProperty(changes.showIcon.currentValue);
    }
  }

  /**
   * On init
   */
  ngOnInit(): void {
    // Subscribe to the dismiss calls
    this._akaAlertService.onDismiss
      .pipe(
        filter((name) => this.name === name),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe(() => {
        // Dismiss the alert
        this.dismiss();
      });

    // Subscribe to the show calls
    this._akaAlertService.onShow
      .pipe(
        filter((name) => this.name === name),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe(() => {
        // Show the alert
        this.show();
      });
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Dismiss the alert
   */
  dismiss(): void {
    // Return if the alert is already dismissed
    if (this.dismissed) {
      return;
    }

    // Dismiss the alert
    this._toggleDismiss(true);
  }

  /**
   * Show the dismissed alert
   */
  show(): void {
    // Return if the alert is already showing
    if (!this.dismissed) {
      return;
    }

    // Show the alert
    this._toggleDismiss(false);
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Private methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Dismiss/show the alert
   *
   * @param dismissed
   * @private
   */
  private _toggleDismiss(dismissed: boolean): void {
    // Return if the alert is not dismissible
    if (!this.dismissible) {
      return;
    }

    // Set the dismissed
    this.dismissed = dismissed;

    // Execute the observable
    this.dismissedChanged.next(this.dismissed);

    // Notify the change detector
    this._changeDetectorRef.markForCheck();
  }
}
