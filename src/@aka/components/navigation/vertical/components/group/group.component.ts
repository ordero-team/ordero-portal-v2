import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { BooleanInput } from '@angular/cdk/coercion';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AkaVerticalNavigationComponent } from '@aka/components/navigation/vertical/vertical.component';
import { AkaNavigationService } from '@aka/components/navigation/navigation.service';
import { AkaNavigationItem } from '@aka/components/navigation/navigation.types';

@Component({
  selector: 'aka-vertical-navigation-group-item',
  templateUrl: './group.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AkaVerticalNavigationGroupItemComponent implements OnInit, OnDestroy {
  static ngAcceptInputType_autoCollapse: BooleanInput;

  @Input() autoCollapse: boolean;
  @Input() item: AkaNavigationItem;
  @Input() name: string;

  private _akaVerticalNavigationComponent: AkaVerticalNavigationComponent;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  /**
   * Constructor
   */
  constructor(private _changeDetectorRef: ChangeDetectorRef, private _akaNavigationService: AkaNavigationService) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // Get the parent navigation component
    this._akaVerticalNavigationComponent = this._akaNavigationService.getComponent(this.name);

    // Subscribe to onRefreshed on the navigation component
    this._akaVerticalNavigationComponent.onRefreshed.pipe(takeUntil(this._unsubscribeAll)).subscribe(() => {
      // Mark for check
      this._changeDetectorRef.markForCheck();
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
   * Track by function for ngFor loops
   *
   * @param index
   * @param item
   */
  trackByFn(index: number, item: any): any {
    return item.id || index;
  }
}
