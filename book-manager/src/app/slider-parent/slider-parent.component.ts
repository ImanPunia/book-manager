import { Component, ContentChildren, Input, OnInit } from '@angular/core';
import { PageContentComponent } from '../page-content/page-content.component';
import { PageSwitchService } from '../service/page-switch.service';
import { SliderTabComponent } from '../slider-tab/slider-tab.component';

@Component({
  selector: 'app-slider-parent',
  templateUrl: './slider-parent.component.html',
  styleUrls: ['./slider-parent.component.scss']
})
export class SliderParentComponent implements OnInit {

  @ContentChildren(PageContentComponent) BodyChildren!: PageContentComponent[];

  constructor(private readonly navSer:  PageSwitchService) { }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void{
    this.navSer.registerNavBody(this.BodyChildren);
  }

 
}
