import { Component, Input, OnInit } from '@angular/core';
import { book } from 'src/app/Models/bookSaved';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { httpConnectionService } from 'src/app/service/httpConnection.service';


@Component({
  selector: 'app-ux-card',
  templateUrl: './ux-card.component.html',
  styleUrls: ['./ux-card.component.scss'],
})
export class UxCardComponent implements OnInit {
  @Input('book')
  Book!: book;
  imgSrc: SafeResourceUrl = '';

  constructor( private readonly dmSanitizer: DomSanitizer,
    readonly connSer: httpConnectionService) {}

  ngOnInit(): void {
      this.imgSrc = this.dmSanitizer.bypassSecurityTrustResourceUrl(
         `data:${this.Book.file.mimetype};base64,${this.Book.src}`
       );
  }

  delete(){
    this.connSer.deleteBook(this.Book.id).subscribe(res => console.log(res.count));
  }


}
