import { Directive, ElementRef, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { RoleService } from '@cs/role.service';

@Directive({
  selector: '[akaCan]',
})
export class AkaCanDirective {
  private _permissions: string | string[];

  constructor(
    private element: ElementRef,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private role: RoleService
  ) {}

  @Input('akaCan')
  set permissions(val) {
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

@Directive({
  selector: '[akaRole]',
})
export class AkaRoleDirective {
  private _roles: string | string[];

  constructor(
    private element: ElementRef,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private role: RoleService
  ) {}

  @Input('akaRole')
  set roles(val) {
    this._roles = val;
    this.updateView();
  }

  get roles() {
    return this._roles;
  }

  private updateView() {
    if (typeof this.roles !== 'undefined') {
      if (this.role.verifyRole(this.roles)) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainer.clear();
      }
    } else {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }
}
