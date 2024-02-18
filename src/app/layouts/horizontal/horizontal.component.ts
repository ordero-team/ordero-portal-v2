import { AkaNavigationService } from '@aka/components/navigation/navigation.service';
import { AkaMediaWatcherService } from '@aka/services/tailwind';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OwnerLocation, OwnerProfileCollection } from '@app/collections/owner/profile.collection';
import { NavigationService } from '@app/core/services/navigation.service';
import { OwnerAuthService } from '@app/core/services/owner/auth.service';
import { ToastService } from '@app/core/services/toast.service';
import { OwnerState } from '@app/core/states/owner/owner.state';
import { DialogComponent } from '@app/shared/components/dialog/dialog.component';
import { Form, FormRecord } from '@lib/form';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Select } from '@ngxs/store';
import { get } from 'lodash';
import { Observable, Subject } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'aka-horizontal-layout',
  templateUrl: './horizontal.component.html',
  styleUrls: ['./horizontal.component.scss'],
})
export class HorizonalLayoutComponent implements OnInit, OnDestroy {
  isScreenSmall: boolean;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  navigations: any[] = [];

  @Form({
    location: '',
  })
  formData: FormRecord;

  @Select(OwnerState.currentLocation) currentLocation$: Observable<OwnerLocation>;

  @ViewChild('locationDialog', { static: true }) locationDialog: DialogComponent;

  /**
   * Constructor
   */
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _akaMediaWatcherService: AkaMediaWatcherService,
    private _akaNavigationService: AkaNavigationService,
    private navService: NavigationService,
    private auth: OwnerAuthService,
    private collection: OwnerProfileCollection,
    private toast: ToastService
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
    this.navigations = this.navService.buildNav(this._activatedRoute);

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

  openChangeLocationDialog() {
    this.formData.$import({ location: this.auth.currentUser.location || {} });
    this.locationDialog.show();
  }

  async changeLocation() {
    this.formData.$loading = true;
    try {
      const payload = {
        ...this.auth.currentUser,
        location_id: get(this.formData.$payload, 'location.id', null),
        role_id: get(this.auth.currentUser, 'role.id', null),
      };
      await this.collection.update('', payload);

      this.toast.info(`Location have been successfully changed to ${get(this.formData.$payload, 'location.name', null)}`);
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      this.toast.error('Something bad happened', error);
    }

    this.locationDialog.hide();
    this.formData.$loading = false;
  }
}
