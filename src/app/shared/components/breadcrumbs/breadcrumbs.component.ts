import { Component, Input, OnInit } from '@angular/core';
import { RoleService } from '@app/core/services/role.service';
import { SubNavigationService } from '@app/shared/services/sub-navigation.service';
import { appIcons } from '@ch/icon.helper';
import { ActiveRouteService, IRouteSegment, IRouteSegments } from '@cs/active-route.service';
import { IAction, IActionGroup, SetBreadcrumbAction, SetBreadcrumbGroup } from '@ct/breadcrumb/breadcrumb.actions';
import { BreadcrumbState } from '@ct/breadcrumb/breadcrumb.state';
import { TranslateService } from '@ngx-translate/core';
import { Select, Store } from '@ngxs/store';
import { has } from 'lodash';
import { Observable } from 'rxjs';

@Component({
  selector: 'aka-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
})
export class BreadcrumbsComponent implements OnInit {
  @Select(BreadcrumbState.getActions) actions$: Observable<IActionGroup>;
  @Select(BreadcrumbState.getGroups) groups$: Observable<any>;
  @Input() crumbs: IRouteSegments;

  twoToneArrowBack = appIcons.twoToneArrowBack;
  actions: IActionGroup;
  groups: IActionGroup;

  // Sub Navigation
  subNavMode: string;
  subNavOpen: boolean;
  isLoaded: boolean;

  constructor(
    public active: ActiveRouteService,
    private translate: TranslateService,
    private store: Store,
    public subNavService: SubNavigationService,
    private role: RoleService
  ) {
    this.buildSegments();
    active.segmentChange.subscribe(() => {
      this.buildSegments();
    });

    this.actions$.subscribe((act) => {
      this.actions = act;
    });

    this.groups$.subscribe((act) => {
      this.groups = act;
    });

    this.subNavService.drawerMode$.subscribe((value) => {
      this.subNavMode = value;
    });

    this.subNavService.drawerOpened$.subscribe((value) => {
      this.subNavOpen = value;
    });

    this.subNavService.isLoaded$.subscribe((value) => {
      this.isLoaded = value;
    });
  }

  public ngOnInit() {
    this.store.dispatch(new SetBreadcrumbAction([]));
    this.store.dispatch(new SetBreadcrumbGroup([]));
  }

  private buildSegments() {
    this.crumbs = (this.active.segments || []).filter((segment) => {
      if (typeof segment.config.hideBreadcrumb === 'boolean') {
        return !segment.config.hideBreadcrumb;
      } else if (typeof segment.config.hideBreadcrumb === 'function') {
        return !segment.config.hideBreadcrumb(this.active);
      } else {
        return this.getTitle(segment);
      }
    });
  }

  getTitle(crumb: IRouteSegment) {
    if (has(crumb, 'config.maps')) {
      return crumb.display.title;
    }

    if (has(crumb, 'config.titleBreadcrumb')) {
      return this.translate.instant(`breadcrumb.${crumb.config.titleBreadcrumb}`);
    }

    return this.translate.instant(`nav.${crumb.display.title}`);
  }

  back() {
    return this.active.navigate('../');
  }

  showAction(item: IAction) {
    if (item.permissions) {
      return this.role.verifyPermission(item.permissions);
    }

    return true;
  }
}
