import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AkaHorizontalNavigationComponent } from '@aka/components/navigation/horizontal/horizontal.component';
import { AkaNavigationService } from '@aka/components/navigation/navigation.service';
import { AkaNavigationItem } from '@aka/components/navigation/navigation.types';

@Component({
  selector: 'aka-horizontal-navigation-divider-item',
  templateUrl: './divider.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AkaHorizontalNavigationDividerItemComponent implements OnInit, OnDestroy {
  @Input() item: AkaNavigationItem;
  @Input() name: string;

  private _akaHorizontalNavigationComponent: AkaHorizontalNavigationComponent;
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
    this._akaHorizontalNavigationComponent = this._akaNavigationService.getComponent(this.name);

    // Subscribe to onRefreshed on the navigation component
    this._akaHorizontalNavigationComponent.onRefreshed.pipe(takeUntil(this._unsubscribeAll)).subscribe(() => {
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
}
