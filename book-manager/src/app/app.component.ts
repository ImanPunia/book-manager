import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { httpConnectionService } from './service/httpConnection.service';
import { AddBookDialogComponent } from './book-dialog/add-book-dialog/add-book-dialog.component';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { book } from './Models/bookSaved';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'book-manager';
  savedBook: book[] = [];
  imgSrc: SafeResourceUrl = '';

  constructor(
    public dialog: MatDialog,
    readonly connSer: httpConnectionService,
    private readonly dmSanitizer: DomSanitizer
  ) {}
  ngOnInit(): void {}

  openDialog(): void {
    const dialogRef = this.dialog.open(AddBookDialogComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((value) => {
      if (value != undefined) {
        console.log(JSON.stringify(value));
        let formData = new FormData();
        formData.append('file', value.file);
        formData.append('data', JSON.stringify(value));
        this.addSingleBook(formData);
      }
    });
  }

  addSingleBook(formData: FormData) {
    this.connSer.addSingleBook(formData).subscribe((res) => {
      this.savedBook = res.book;
      this.imgSrc = this.dmSanitizer.bypassSecurityTrustResourceUrl(
        `data:${this.savedBook[0].file.mimetype};base64,${res.src}`
      );
    });
  }
}
