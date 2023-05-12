import { AfterViewInit, Component, ContentChildren, Directive, OnDestroy, QueryList, TemplateRef } from '@angular/core';
import { SetBreadcrumbGroup } from '@ct/breadcrumb/breadcrumb.actions';
import { Store } from '@ngxs/store';

@Directive({
  selector: '[akaBreadcrumbGroup]',
})
export class BreadcrumbGroupDirective {
  constructor(public template: TemplateRef<any>) {}
}

@Component({
  selector: 'aka-breadcrumb-group',
  template: '<ng-content></ng-content>',
})
export class BreadcrumbGroupComponent implements AfterViewInit, OnDestroy {
  @ContentChildren(BreadcrumbGroupDirective) groups: QueryList<BreadcrumbGroupDirective>;

  constructor(private store: Store) {}

  /**
   * After the view initialized, it'll add the action groups into the state, so the
   * Action Bar component will render it.
   */
  ngAfterViewInit() {
    setTimeout(() => {
      // this.store.dispatch(new SetBreadcrumbGroup(this.groups.toArray()));
    }, 50);
  }

  /**
   * When the component destroyed, it'll remove the current action groups from the state
   * to make sure the Action Bar component is clean before rendering another actions.
   */
  ngOnDestroy() {
    this.store.dispatch(new SetBreadcrumbGroup([]));
  }
}
