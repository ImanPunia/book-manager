import { Directive, ElementRef, HostListener } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
  selector: 'input[type=file][ngModel][appFileDirective]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: FileDirectiveDirective,
    },
  ],
})
export class FileDirectiveDirective implements ControlValueAccessor {
  OnChangeValueAccessor: Function = () => {};

  constructor(private readonly el: ElementRef) {}

  @HostListener('change', ['$event'])
  onChange($event: Event) {
    this.OnChangeValueAccessor(this.el.nativeElement.files[0]);
  }

  writeValue(value: any): void {
    this.el.nativeElement.value = value;
  }

  registerOnChange(fn: Function): void {
    this.OnChangeValueAccessor = fn;
  }

  registerOnTouched(fn: any): void {}
}
