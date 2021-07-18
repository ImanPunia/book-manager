import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  constructor(private el: ElementRef) { }

  @HostListener('mouseenter') onMouseEnter() {
    this.highlightElement('rgb(47 39 39 / 58%)');
  }
  
  @HostListener('mouseleave') onMouseLeave() {
    this.highlightElement('');
  }
  
  private highlightElement(color: string) {
    let icons = this.el.nativeElement.getElementsByClassName('font_20');
    for(let i=0; i < icons.length; i++){
      icons[i].style.color = color;
    }
  }

}
