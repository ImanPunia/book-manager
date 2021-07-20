import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

export enum sliderState{
  OPEN = 'open',
  CLOSE = 'close'
}
@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {
  show: boolean  =  false;
  constructor() { }

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
