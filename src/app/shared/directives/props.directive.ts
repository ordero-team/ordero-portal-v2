import {
  AfterViewInit,
  ChangeDetectorRef,
  ComponentFactoryResolver,
  ComponentRef,
  ContentChild,
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewContainerRef,
} from '@angular/core';
import { FormControl, NgControl, NgModel } from '@angular/forms';
import { FormMessageComponent } from '@sc/form-message/form-message.component';
import { FormRequiredMarkerComponent } from '@sc/form-required-marker/form-required-marker.component';
import { FormDirective } from '@sd/form.directive';

export abstract class CustomFormFieldNgControl extends NgControl {
  required: boolean;
}

@Directive({
  selector: '[akaProps]',
})
export class PropsDirective implements OnInit, OnDestroy, AfterViewInit {
  @Input('akaProps') props: string;

  @ContentChild(NgModel, { static: false }) model: NgModel;
  @ContentChild(NgControl) control: CustomFormFieldNgControl;

  private formMsg: ComponentRef<FormMessageComponent> = null;
  private marker: ComponentRef<FormRequiredMarkerComponent> = null;

  constructor(
    private vcRef: ViewContainerRef,
    private cdRef: ChangeDetectorRef,
    private elRef: ElementRef,
    private factory: ComponentFactoryResolver,
    private form: FormDirective
  ) {}

  ngOnInit(): void {
    if (!this.formMsg) {
      this.createLoaderComponent();
      this.makeComponentAChild();
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.registerProp(this);
    }, 0);
  }

  ngOnDestroy(): void {
    if (this.formMsg) {
      this.formMsg.destroy();
    }

    if (this.marker) {
      this.marker.destroy();
    }
  }

  registerProp(prop: PropsDirective) {
    if (!prop.model) {
      console.warn("You haven't set ngModel under akaProps directive");
      return;
    }

    const { name } = prop.model;
    const fieldName = prop.props || name;
    if (!fieldName) {
      console.warn('Field name not found');
      return;
    }

    if (!this.form.validators[fieldName]) {
      console.warn('Validator not found for', fieldName);
      return;
    }

    const { validators, messages } = this.form.validators[fieldName];
    if (this.form.ngForm.controls[fieldName]) {
      this.form.ngForm.removeControl(prop.model);
    }
    this.form.ngForm.addControl(prop.model);

    const { control } = prop.model;
    if (!control) {
      console.warn('Control not found for', fieldName);
      return;
    }

    // do not change the order
    control.setValidators(validators);
    prop.markRequired();

    control.statusChanges.subscribe((value) => {
      const invalid = value === 'INVALID' && control.dirty;
      if (!invalid) {
        prop.hideMessage();
        return;
      }

      let error = '';
      for (const rule in control.errors) {
        if (control.errors.hasOwnProperty(rule)) {
          error = messages[rule.toLowerCase()];
        }
      }
      prop.showMessage(error);
    });
  }

  public showMessage(msg = '') {
    this.formMsg.instance.message = msg;
    // Add Class `has-error` when field has error
    if (this.elRef && this.elRef.nativeElement) {
      this.elRef.nativeElement.classList.add('has-error');
    }
  }

  public hideMessage() {
    this.formMsg.instance.message = null;
    // remove Class `has-error`
    if (this.elRef && this.elRef.nativeElement) {
      this.elRef.nativeElement.classList.remove('has-error');
    }
  }

  public markRequired() {
    if (this.control) {
      const { control } = this.control;
      const validator = control ? control.validator : null;
      if (validator) {
        Promise.resolve().then(() => {
          this.control.required = !!(validator(new FormControl()) || {}).required;
          this.cdRef.markForCheck();
        });

        if (!this.marker) {
          this.createLoaderMarkerComponent();
          this.makeMarkerComponentAChild();
        }
      }
    }
  }

  private createLoaderComponent() {
    const componentMsgFactory = this.factory.resolveComponentFactory(FormMessageComponent);
    this.formMsg = this.vcRef.createComponent(componentMsgFactory);
  }

  private makeComponentAChild() {
    const loaderComponentElement = this.formMsg.location.nativeElement;
    const sibling: HTMLElement = loaderComponentElement.previousSibling;
    sibling.appendChild(loaderComponentElement);
  }

  private createLoaderMarkerComponent() {
    const componentMrkFactory = this.factory.resolveComponentFactory(FormRequiredMarkerComponent);
    this.marker = this.vcRef.createComponent(componentMrkFactory);
  }

  private makeMarkerComponentAChild() {
    const loaderComponentElement = this.marker.location.nativeElement;
    const sibling: HTMLElement = loaderComponentElement.previousSibling;
    const label: HTMLElement = sibling.querySelector('mat-label:first-child');
    if (label) {
      label.appendChild(loaderComponentElement);
    } else {
      loaderComponentElement.remove();
    }
  }
}
