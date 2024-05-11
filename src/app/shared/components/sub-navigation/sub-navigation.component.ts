import { AkaNavigationItem } from '@aka/components/navigation/navigation.types';
import { AkaMediaWatcherService } from '@aka/services/media-watcher/media-watcher.service';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { checkRouterChildData } from '@ch/route.helper';
import { INavRoute, NavigationService } from '@cs/navigation.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { TranslateService } from '@ngx-translate/core';
import { SubNavigationService } from '@ss/sub-navigation.service';
import { filter, map, startWith } from 'rxjs/operators';

@UntilDestroy()
@Component({
  selector: 'aka-sub-navigation',
  templateUrl: './sub-navigation.component.html',
  styleUrls: ['./sub-navigation.component.scss'],
})
export class SubNavigationComponent implements OnInit, OnDestroy {
  @Input() forRoute: string;

  drawerMode: 'over' | 'side' = 'side';
  drawerOpened = true;
  menuData: AkaNavigationItem[];

  disableScroll$ = this.router.events.pipe(
    filter((event) => event instanceof NavigationEnd),
    startWith(null as string),
    map(() => checkRouterChildData(this.router.routerState.root.snapshot, (data) => data.disableScroll))
  );

  constructor(
    private router: Router,
    private service: NavigationService,
    private translate: TranslateService,
    private mediaWatcher: AkaMediaWatcherService,
    public subNavService: SubNavigationService
  ) {
    this.router.events.pipe(untilDestroyed(this)).subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (this.drawerMode === 'over' && this.drawerOpened) {
          this.subNavService.close();
        }
      }
    });
  }

  ngOnInit(): void {
    const routes = this.configOf(this.service.configs, this.forRoute);
    if (routes && (routes.children || []).length) {
      const filters = routes.children.filter((item) => !item.hideSubNav);
      this.menuData = filters.map((child) => ({
        type: child.type || 'basic',
        id: child.name,
        link: ['./', child.path].join(''),
        title: this.translate.instant(`nav.${child.title}`),
        icon: child.icon,
        exactMatch: true,
        permissions: child.permissions,
      }));
    }

    this.subNavService.drawerMode$.pipe(untilDestroyed(this)).subscribe((value) => {
      this.drawerMode = value;
    });

    this.subNavService.drawerOpened$.pipe(untilDestroyed(this)).subscribe((value) => {
      this.drawerOpened = value;
    });

    this.subNavService.isLoaded = true;
  }

  configOf(configs: INavRoute[], name: string) {
    let current;

    for (const config of configs) {
      if (config.name === name) {
        return config;
      }

      if (config.children) {
        current = this.configOf(config.children, name);
      }

      if (current) {
        return current;
      }
    }

    return current;
  }

  ngOnDestroy() {
    this.subNavService.isLoaded = false;
  }
}
