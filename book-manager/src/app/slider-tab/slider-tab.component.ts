import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { navTypes } from '../service/inter-communication.service';
import { PageSwitchService } from '../service/page-switch.service';
import { SliderComponent } from '../slider/slider/slider.component';

@Component({
  selector: 'app-slider-tab',
  templateUrl: './slider-tab.component.html',
  styleUrls: ['./slider-tab.component.scss']
})
export class SliderTabComponent implements OnInit {

  @Input() nav!: navTypes;
  @Output() action = new EventEmitter<boolean>()

  index!: string ;

  _isActive =  false;
  set isActive(_isActive){
    this._isActive = _isActive;
    this.cd.detectChanges();
  }

  get isActive(){
    return this._isActive;
  }

  constructor(private readonly pageSer:  PageSwitchService,
    private readonly cd: ChangeDetectorRef) { }

  ngOnInit(): void { this.index = this.nav.id;}

  showNavBody(){
    this.pageSer.switchNavPage(this.index);
    this.action.emit(false);
  }

}
 
