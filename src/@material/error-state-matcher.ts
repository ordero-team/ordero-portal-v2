import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher as Parent } from '@angular/material/core';

export class ErrorStateMatcher implements Parent {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    // return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    return !!(control && control.invalid && (control.dirty || isSubmitted));
  }
}
