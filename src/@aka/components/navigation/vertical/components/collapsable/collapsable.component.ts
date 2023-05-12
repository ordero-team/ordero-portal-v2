import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, Input, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BooleanInput } from '@angular/cdk/coercion';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { AkaAnimations } from '@aka/animations';
import { AkaVerticalNavigationComponent } from '@aka/components/navigation/vertical/vertical.component';
import { AkaNavigationService } from '@aka/components/navigation/navigation.service';
import { AkaNavigationItem } from '@aka/components/navigation/navigation.types';

@Component({
  selector: 'aka-vertical-navigation-collapsable-item',
  templateUrl: './collapsable.component.html',
  styles: [],
  animations: AkaAnimations,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AkaVerticalNavigationCollapsableItemComponent implements OnInit, OnDestroy {
  static ngAcceptInputType_autoCollapse: BooleanInput;

  @Input() autoCollapse: boolean;
  @Input() item: AkaNavigationItem;
  @Input() name: string;

  isCollapsed = true;
  isExpanded = false;
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
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  /**
   * Host binding for component classes
   */
  @HostBinding('class') get classList(): any {
    return {
      'aka-vertical-navigation-item-collapsed': this.isCollapsed,
      'aka-vertical-navigation-item-expanded': this.isExpanded,
    };
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // Get the parent navigation component
    this._akaVerticalNavigationComponent = this._akaNavigationService.getComponent(this.name);

    // If the item has a children that has a matching url with the current url, expand...
    if (this._hasCurrentUrlAsChildren(this.item, this._router.url)) {
      this.expand();
    }
    // Otherwise...
    else {
      // If the autoCollapse is on, collapse...
      if (this.autoCollapse) {
        this.collapse();
      }
    }

    // Listen for the onCollapsableItemCollapsed from the service
    this._akaVerticalNavigationComponent.onCollapsableItemCollapsed
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((collapsedItem) => {
        // Check if the collapsed item is null
        if (collapsedItem === null) {
          return;
        }

        // Collapse if this is a children of the collapsed item
        if (this._isChildrenOf(collapsedItem, this.item)) {
          this.collapse();
        }
      });

    // Listen for the onCollapsableItemExpanded from the service if the autoCollapse is on
    if (this.autoCollapse) {
      this._akaVerticalNavigationComponent.onCollapsableItemExpanded
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((expandedItem) => {
          // Check if the expanded item is null
          if (expandedItem === null) {
            return;
          }

          // Check if this is a parent of the expanded item
          if (this._isChildrenOf(this.item, expandedItem)) {
            return;
          }

          // Check if this has a children with a matching url with the current active url
          if (this._hasCurrentUrlAsChildren(this.item, this._router.url)) {
            return;
          }

          // Check if this is the expanded item
          if (this.item === expandedItem) {
            return;
          }

          // If none of the above conditions are matched, collapse this item
          this.collapse();
        });
    }

    // Attach a listener to the NavigationEnd event
    this._router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe((event: NavigationEnd) => {
        // If the item has a children that has a matching url with the current url, expand...
        if (this._hasCurrentUrlAsChildren(this.item, event.urlAfterRedirects)) {
          this.expand();
        }
        // Otherwise...
        else {
          // If the autoCollapse is on, collapse...
          if (this.autoCollapse) {
            this.collapse();
          }
        }
      });

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
   * Check if this is a children
   * of the given item
   *
   * @param parent
   * @param item
   * @return {boolean}
   * @private
   */
  private _isChildrenOf(parent: AkaNavigationItem, item: AkaNavigationItem): boolean {
    const children = parent.children;

    if (!children) {
      return false;
    }

    if (children.indexOf(item) > -1) {
      return true;
    }

    for (const child of children) {
      if (child.children) {
        if (this._isChildrenOf(child, item)) {
          return true;
        }
      }
    }

    return false;
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Collapse
   */
  collapse(): void {
    // Return if the item is disabled
    if (this.item.disabled) {
      return;
    }

    // Return if the item is already collapsed
    if (this.isCollapsed) {
      return;
    }

    // Collapse it
    this.isCollapsed = true;
    this.isExpanded = !this.isCollapsed;

    // Mark for check
    this._changeDetectorRef.markForCheck();

    // Execute the observable
    this._akaVerticalNavigationComponent.onCollapsableItemCollapsed.next(this.item);
  }

  /**
   * Expand
   */
  expand(): void {
    // Return if the item is disabled
    if (this.item.disabled) {
      return;
    }

    // Return if the item is already expanded
    if (!this.isCollapsed) {
      return;
    }

    // Expand it
    this.isCollapsed = false;
    this.isExpanded = !this.isCollapsed;

    // Mark for check
    this._changeDetectorRef.markForCheck();

    // Execute the observable
    this._akaVerticalNavigationComponent.onCollapsableItemExpanded.next(this.item);
  }

  /**
   * Toggle collapsable
   */
  toggleCollapsable(): void {
    // Toggle collapse/expand
    if (this.isCollapsed) {
      this.expand();
    } else {
      this.collapse();
    }
  }

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
