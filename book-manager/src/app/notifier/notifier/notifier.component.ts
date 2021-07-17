import { Component, ContentChild, ElementRef, OnInit, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-notifier',
  templateUrl: './notifier.component.html',
  styleUrls: ['./notifier.component.scss']
})
export class NotifierComponent implements OnInit {
  //@ContentChild("appExampleZippyContent") cardContentHeader!: TemplateRef<ElementRef>;
 // @ContentChild("header") header!: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

}
