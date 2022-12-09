import { Directive, EventEmitter, Input, ChangeDetectorRef, Output, ElementRef, HostListener, Inject, Renderer2 } from '@angular/core';
import { NgModel } from '@angular/forms';

@Directive({
  selector: '[appTrim]',
})
export class DisallowSpacesDirective {

  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef,
    private ngModel: NgModel) { }

  @HostListener("blur")
  onBlur() {
    let value = this.ngModel.model;

    if(value) {
      value = value.trim();
      this.renderer.setProperty(
        this.elementRef.nativeElement, "value", value);
      this.renderer.setAttribute(
        this.elementRef.nativeElement, "value", value);
      this.ngModel.update.emit(value);
    } else {
      this.renderer.setProperty(
        this.elementRef.nativeElement, "value", null);
      this.renderer.setAttribute(
        this.elementRef.nativeElement, "value", null);
      this.ngModel.update.emit("");
    }
  }
}
