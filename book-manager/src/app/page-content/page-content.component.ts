import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { PageSwitchService } from '../service/page-switch.service';

@Component({
  selector: 'app-page-content',
  templateUrl: './page-content.component.html',
  styleUrls: ['./page-content.component.scss']
})
export class PageContentComponent implements OnInit {
  @Input() index!: string;

  _isActive = false;
  set isActive(_isActive){
    this._isActive = _isActive;
    this.cd.detectChanges();
  }

  get isActive(){
    return this._isActive;
  }

  constructor(private  readonly cd: ChangeDetectorRef) { }

  ngOnInit(): void { }

}
