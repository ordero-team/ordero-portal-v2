import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BooleanInput } from '@angular/cdk/coercion';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { AkaVerticalNavigationComponent } from '@aka/components/navigation/vertical/vertical.component';
import { AkaNavigationService } from '@aka/components/navigation/navigation.service';
import { AkaNavigationItem } from '@aka/components/navigation/navigation.types';

@Component({
  selector: 'aka-vertical-navigation-aside-item',
  templateUrl: './aside.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AkaVerticalNavigationAsideItemComponent implements OnChanges, OnInit, OnDestroy {
  static ngAcceptInputType_autoCollapse: BooleanInput;
  static ngAcceptInputType_skipChildren: BooleanInput;

  @Input() activeItemId: string;
  @Input() autoCollapse: boolean;
  @Input() item: AkaNavigationItem;
  @Input() name: string;
  @Input() skipChildren: boolean;

  active = false;
  private _akaVerticalNavigationComponent: AkaVerticalNavigationComponent;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  /**
   * Constructor
   */
  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _router: Router,
    private _akaNavigationService: AkaNavigationService
  ) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On changes
   *
   * @param changes
   */
  ngOnChanges(changes: SimpleChanges): void {
    // Active item id
    if ('activeItemId' in changes) {
      // Mark if active
      this._markIfActive(this._router.url);
    }
  }

  /**
   * On init
   */
  ngOnInit(): void {
    // Mark if active
    this._markIfActive(this._router.url);

    // Attach a listener to the NavigationEnd event
    this._router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe((event: NavigationEnd) => {
        // Mark if active
        this._markIfActive(event.urlAfterRedirects);
      });

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
  // @ Private methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Check if the given item has the given url
   * in one of its children
   *
   * @param item
   * @param url
   * @private
   */
  private _hasCurrentUrlAsChildren(item: AkaNavigationItem, url: string): boolean {
    const children = item.children;

    if (!children) {
      return false;
    }

    for (const child of children) {
      if (child.children) {
        if (this._hasCurrentUrlAsChildren(child, url)) {
          return true;
        }
      }

      // Skip items other than 'basic'
      if (child.type !== 'basic') {
        return false;
      }

      // Check if the item's link is the exact same of the
      // current url
      if (child.link === url) {
        return true;
      }

      // If exactMatch is not set for the item, also check
      // if the current url starts with the item's link and
      // continues with a question mark, a pound sign or a
      // slash
      if (
        !child.exactMatch &&
        (child.link === url ||
          url.startsWith(child.link + '?') ||
          url.startsWith(child.link + '#') ||
          url.startsWith(child.link + '/'))
      ) {
        return true;
      }
    }

    return false;
  }

  /**
   * Decide and mark if the item is active
   *
   * @private
   */
  private _markIfActive(url: string): void {
    // Check if the activeItemId is equals to this item id
    this.active = this.activeItemId === this.item.id;

    // If the aside has a children that is active,
    // always mark it as active
    if (this._hasCurrentUrlAsChildren(this.item, url)) {
      this.active = true;
    }

    // Mark for check
    this._changeDetectorRef.markForCheck();
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
