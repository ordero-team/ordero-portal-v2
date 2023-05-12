import { DOCUMENT } from '@angular/common';
import { Component, ErrorHandler, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { AuthService } from '@app/core/services/auth.service';
import { DarkModeService } from '@app/core/services/dark-mode.service';
import { appIcons } from '@ch/icon.helper';
import { LANGUAGES } from '@ch/language.helper';
import { Profile } from '@cl/profile.collection';
import { NavigationService } from '@cs/navigation.service';
import { AuthState } from '@ct/auth/auth.state';
import { SetNavigationCancel, SetNavigationEnd, SetNavigationError, SetNavigationStart } from '@ct/router/router.actions';
import { SetLanguage } from '@ct/ui/ui.actions';
import { UIState } from '@ct/ui/ui.state';
import { RequestTracker } from '@lib/request';
import { LocalStorage } from '@lib/storage';
import { time } from '@lib/time';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { TranslateService } from '@ngx-translate/core';
import { Select, Store } from '@ngxs/store';
import { IconService } from '@visurel/iconify-angular';
import { Observable } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'keeppack-root',
  templateUrl: './keeppack.component.html',
  styleUrls: ['./keeppack.component.scss'],
})
export class KeeppackComponent implements OnInit {
  @Select(UIState.getLanguage) language$: Observable<string>;
  @Select(AuthState.currentUser) user$: Observable<Profile>;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(LANGUAGES) public languages,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store,
    private translate: TranslateService,
    private errorHandler: ErrorHandler,
    private loader: LoadingBarService,
    private nav: NavigationService,
    private iconService: IconService,
    public auth: AuthService,
    private darkModeService: DarkModeService
  ) {
    iconService.registerAll(appIcons);

    // test whether localstorage support or not
    LocalStorage.testLocalStorage();

    this.darkModeService.setDarkTheme(this.darkModeService.isDarkTheme);

    // listen to router events
    this.router.events.pipe(untilDestroyed(this)).subscribe((event: any) => {
      if (event instanceof NavigationStart) {
        this.store.dispatch(new SetNavigationStart(event));
      }

      if (event instanceof NavigationEnd) {
        this.store.dispatch(new SetNavigationEnd(event));
        this.nav.setPageTitle(this.router.routerState.root, this.translate);
      }

      if (event instanceof NavigationCancel) {
        this.store.dispatch(new SetNavigationCancel(event));
        this.nav.setPageTitle(this.router.routerState.root, this.translate);
      }

      if (event instanceof NavigationError) {
        this.store.dispatch(new SetNavigationError(event));
      }
    });

    // if dev decided to use the browser language as default and if this language is handled by the app, use it
    const browserLanguage = this.translate.getBrowserLang();
    let defaultLanguage = this.languages.includes(browserLanguage) ? browserLanguage : this.languages[0];
    time().locale(defaultLanguage);

    // default and fallback language
    // if a translation isn't found in a language,
    // it'll try to get it on the default language
    // @TODO remove default lang
    defaultLanguage = 'en';
    this.translate.setDefaultLang(defaultLanguage);
    this.store.dispatch(new SetLanguage(defaultLanguage));

    // when the language changes in store,
    // change it in translate provider
    this.language$.pipe(untilDestroyed(this)).subscribe((language) => {
      this.translate.use(language);
      this.nav.setPageTitle(this.router.routerState.root, this.translate);
    });

    // Run Loader when http request started
    RequestTracker.onHttpStart.subscribe(() => {
      this.loader.start();
    });

    // Stop Loader when http request finished
    RequestTracker.onHttpFinish.subscribe(() => {
      this.loader.stop();
    });

    // throw error from axios to angular error handler
    RequestTracker.onHttpErrors.subscribe((error) => {
      this.loader.stop();
      this.errorHandler.handleError(error);
    });
  }

  ngOnInit() {
    if (navigator.userAgent.indexOf('Chrome') > -1) {
      document.body.classList.add('advanced-styling');
    }
  }
}
