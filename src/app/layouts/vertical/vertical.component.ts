import { AkaNavigationService } from '@aka/components/navigation/navigation.service';
import { AkaVerticalNavigationAppearance } from '@aka/components/navigation/navigation.types';
import { AkaMediaWatcherService } from '@aka/services/media-watcher/media-watcher.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { SetMenuCollapsed } from '@app/core/states/ui/ui.actions';
import { UIState } from '@app/core/states/ui/ui.state';
import { DialogComponent } from '@app/shared/components/dialog/dialog.component';
import { AuthService } from '@cs/auth.service';
import { NavigationService } from '@cs/navigation.service';
import { Form, FormRecord } from '@lib/form';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Select, Store } from '@ngxs/store';
import { User } from '@sentry/browser';
import { Observable } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'aka-vertical-layout',
  templateUrl: './vertical.component.html',
  styleUrls: ['./vertical.component.scss'],
})
export class VerticalComponent implements OnInit {
  @Select(UIState.getIsMenuCollapsed) isMenuCollapsed$: Observable<boolean>;

  @Form({
    warehouse: '',
  })
  formData: FormRecord;

  user: User;
  navigations: any[] = [];
  isScreenSmall: boolean;
  navigationAppearance: AkaVerticalNavigationAppearance;

  @ViewChild('warehouseDialog', { static: true }) warehouseDialog: DialogComponent;

  /**
   * Constructor
   */
  constructor(
    private _akaMediaWatcherService: AkaMediaWatcherService,
    private _akaNavigationService: AkaNavigationService,
    private navService: NavigationService,
    public auth: AuthService,
    private store: Store
  ) {
    this.isMenuCollapsed$.pipe(untilDestroyed(this)).subscribe((collapsed) => {
      this.navigationAppearance = collapsed ? 'default' : 'dense';
    });
  }

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
    this.navigations = this.navService.buildNav();

    // Subscribe to media changes
    this._akaMediaWatcherService.onMediaChange$.pipe(untilDestroyed(this)).subscribe(({ matchingAliases }) => {
      // Check if the screen is small
      this.isScreenSmall = !matchingAliases.includes('md');
    });
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

  toggleNavigationAppearance(): void {
    this.store.dispatch(new SetMenuCollapsed(this.navigationAppearance !== 'default'));
  }
}
