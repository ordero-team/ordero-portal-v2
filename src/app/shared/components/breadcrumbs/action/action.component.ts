import { AfterViewInit, Component, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActiveRouteService } from '@cs/active-route.service';
import { SetBreadcrumbAction } from '@ct/breadcrumb/breadcrumb.actions';
import { Store } from '@ngxs/store';

@Component({
  selector: 'aka-breadcrumb-actions',
  template: '',
})
export class BreadcrumbActionComponent implements AfterViewInit, OnDestroy {
  private _actions: any[];
  @Input()
  set actions(val: any[]) {
    this._actions = val;
    this.generateActions();
  }

  get actions() {
    return this._actions;
  }

  constructor(
    private router: Router,
    private current: ActivatedRoute,
    private active: ActiveRouteService,
    private store: Store
  ) {}

  /**
   * After the view initialized, it will map the given actions and put it to the
   * Actionbar's state, so the Action Bar component will render it to the view.
   */
  ngAfterViewInit() {
    this.generateActions();
  }

  /**
   * When the component destroyed, it'll remove the current actions from the
   * Actionbar's state to make sure the action bar is clean before rendering another
   * actions from another pages.
   */
  ngOnDestroy() {
    this.store.dispatch(new SetBreadcrumbAction([]));
  }

  generateActions() {
    if (this.actions) {
      Promise.all(
        this.actions.map(async (group) => {
          return await Promise.all(
            group.map(async ({ text, icon, tips, color, link, click, disabled, iconOnly, permissions }) => {
              const action: any = { text, icon, color, tips, click, disabled, iconOnly, permissions };

              if (link) {
                action.link = await this.active.relativeURL(link, this.current);
              }

              return action;
            })
          );
        })
      ).then((actions) => {
        this.store.dispatch(new SetBreadcrumbAction(actions));
      });
    }
  }
}
