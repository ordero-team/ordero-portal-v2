import { Component } from '@angular/core';

@Component({
  selector: 'aka-breadcrumb-item',
  template: '<ng-content></ng-content>',
  styles: [],
  host: {
    class: 'flex items-center whitespace-nowrap',
  },
})
export class BreadcrumbItemComponent {}
