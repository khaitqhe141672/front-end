import {FormControl, FormGroupDirective, NgForm} from "@angular/forms";
import {ErrorStateMatcher} from "@angular/material/core";

export class FormErrorStateMatcher implements ErrorStateMatcher{
  isErrorState(control: FormControl | null): boolean {
    if (!control) {
      return false;
    }

    return control.touched && control.value;
  }
}
