/**
 * An Interface of Action Object to define the Action Button behavior.
 */
import { QueryList } from '@angular/core';
import { BreadcrumbGroupDirective } from '@sc/breadcrumbs/group/group.component';

export interface IAction {
  iconOnly?: boolean;
  icon?: string;
  tips?: string;
  link?: string;
  color?: string;
  click?: any;
  disabled?: any;
  text?: any;
  permissions?: any[] | string;
  hidden?: () => boolean;
}

/**
 * An array to list the {@link IAction}.
 */
export type IActionList = Array<IAction>;

/**
 * An array as group of {@link IActionList}. Each group will be rendered with a separator.
 */
export type IActionGroup = Array<IActionList>;

export class BreadcrumbStateModel {
  actions?: IActionGroup;
  groups?: QueryList<BreadcrumbGroupDirective>;
}

export class SetBreadcrumbAction {
  static readonly type = '[Breadcrumb] Set Action';
  constructor(public actions: any) {}
}

export class SetBreadcrumbGroup {
  static readonly type = '[Breadcrumb] Set Group';
  constructor(public groups: any) {}
}
