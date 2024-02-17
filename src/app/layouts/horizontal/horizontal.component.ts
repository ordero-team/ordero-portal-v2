import { AkaNavigationService } from '@aka/components/navigation/navigation.service';
import { AkaNavigationItem } from '@aka/components/navigation/navigation.types';
import { AkaMediaWatcherService } from '@aka/services/tailwind';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavigationService } from '@app/core/services/navigation.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Subject } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'aka-horizontal-layout',
  templateUrl: './horizontal.component.html',
  styleUrls: ['./horizontal.component.scss'],
})
export class HorizonalLayoutComponent implements OnInit, OnDestroy {
  isScreenSmall: boolean;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  navigations: AkaNavigationItem[] = [];

  /**
   * Constructor
   */
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _akaMediaWatcherService: AkaMediaWatcherService,
    private _akaNavigationService: AkaNavigationService,
    private navService: NavigationService
  ) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  /**
   * Getter for current year
   */
  get currentYear(): number {
    return new Date().getFullYear();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    this.navigations = this.navService.buildNav() as any[];

    // Subscribe to media changes
    this._akaMediaWatcherService.onMediaChange$.pipe(untilDestroyed(this)).subscribe(({ matchingAliases }) => {
      // Check if the screen is small
      this.isScreenSmall = !matchingAliases.includes('md');
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
   * Toggle navigation
   *
   * @param name
   */
  toggleNavigation(name: string): void {
    // Get the navigation
    const navigation = this._akaNavigationService.getComponent(name);

    if (navigation) {
      // Toggle the opened status
      navigation.toggle();
    }
  }
}
