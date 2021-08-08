import { AfterViewInit, Component, ContentChildren, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { PageSwitchService } from 'src/app/service/page-switch.service';
import { SliderTabComponent } from 'src/app/slider-tab/slider-tab.component';

export enum sliderState{
  OPEN = 'open',
  CLOSE = 'close'
}
@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit, AfterViewInit, OnDestroy {
  show: boolean  =  false;
  childSubscriptions:  Subscription = Subscription.EMPTY;
  @ContentChildren(SliderTabComponent) tabChildren!: SliderTabComponent[];

  constructor(private readonly pageSer: PageSwitchService) { }
  
  ngOnDestroy(): void {
    if(this.childSubscriptions){
      this.childSubscriptions.unsubscribe();
    }
  }

  ngAfterViewInit(): void {
    this.pageSer.registerNavTabs(this.tabChildren);
    this.tabChildren.forEach(el => {
      el.action.subscribe(val  => this.toggleOpenShow())
    })
  }

  ngOnInit(): void { 
  }

  toggleOpenShow():Observable<sliderState>{
    this.show = !this.show;
    return new Observable((observer) => {
      if(this.show){
        observer.next(sliderState.OPEN);
      } else {
        observer.next(sliderState.CLOSE)
      }
    })
  }
}
