import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { book } from 'src/app/Models/bookSaved';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-ux-card',
  templateUrl: './ux-card.component.html',
  styleUrls: ['./ux-card.component.scss'],
})
export class UxCardComponent implements OnInit {
  @Input('book')
  Book!: book;
  @Output() deleted = new EventEmitter<String>();

  imgSrc: SafeResourceUrl = '';

  constructor( private readonly dmSanitizer: DomSanitizer) {}

  ngOnInit(): void {
      this.imgSrc = this.dmSanitizer.bypassSecurityTrustResourceUrl(
         `data:${this.Book.file.mimetype};base64,${this.Book.src}`
       );
  }

  delete(){
    this.deleted.emit(this.Book.id);
  }

}
