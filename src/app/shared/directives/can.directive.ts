import { Directive, ElementRef, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { RoleService } from '@cs/role.service';

@Directive({
  selector: '[akaCan]',
})
export class CanDirective {
  private _permissions: string | string[];

  constructor(
    private element: ElementRef,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private role: RoleService
  ) {}

  @Input('akaCan')
  set permissions(val: string | string[]) {
    this._permissions = val;
    this.updateView();
  }

  get permissions() {
    return this._permissions;
  }

  private updateView() {
    if (typeof this.permissions !== 'undefined') {
      if (this.role.verifyPermission(this.permissions)) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainer.clear();
      }
    } else {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }
}
