import { Component, Input, OnInit } from '@angular/core';
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
  imgSrc: SafeResourceUrl = '';

  constructor( private readonly dmSanitizer: DomSanitizer) {}
  ngOnInit(): void {
      this.imgSrc = this.dmSanitizer.bypassSecurityTrustResourceUrl(
         `data:${this.Book.file.mimetype};base64,${this.Book.src}`
       );
  }
}
