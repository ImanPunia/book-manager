import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { InterCommunicationService } from 'src/app/service/inter-communication.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  @Output() sliderVisible = new EventEmitter<boolean>();
  clicked = false;
  fields: string[] = this.inercomm.headerTypes;

  constructor(private readonly inercomm: InterCommunicationService) { }

  ngOnInit(): void {

  }

  openSlider(){
    this.clicked= !this.clicked;
    this.sliderVisible.emit();
  }
}
